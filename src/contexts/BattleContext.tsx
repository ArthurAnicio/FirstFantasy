'use client';
import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { usePlayer } from './PlayerContext';
import { Character } from '@/interfaces/character';
import { testCall } from '@/functions/testCall';
import { attackCall } from '@/functions/attackCall';
import { Attack } from '@/interfaces/attack';
import { Atribute } from '@/enums/atribute';
import { DamageTypes } from '@/enums/damageTypes';
import { defaultCharacter } from './PlayerContext';
import { TestResult } from '@/interfaces/testResult';
import { EffectTypes } from '@/enums/effectTypes';

export enum Challengers{
    enemy,
    player,
    none
}

const defaultAtk: UsedAttack = {
    owner: "",
    attack: {
        id: '',
        name: '',
        image: '',
        atribute: Atribute.strength,
        damageType: DamageTypes.physical,
        damageQuant: 0,
        damageDice: 0,
        criticalRatio: 0,
        criticalBonus: 0,
        effect: EffectTypes.none,
        costStamina: 0
    },
    ressult: {
        result: 0,
        critical: false,
        failure: false
    }
}

export interface UsedAttack{
    owner: string
    attack: Attack
    ressult: TestResult
} 

interface BattleContextType {
    enemy: Character
    enemyHealth: number
    enemyStamina: number
    enemyDefense: number
    choiceAttack: () => void
    whoseTurn: Challengers
    getEnemy: (enemy:Character)=>void
    enemyAttack: ()=>void
    attackingEnemy: (attack:Attack)=>void
    usedAttack: UsedAttack
    changeTurn: ()=>void
    winner: Challengers
    startBattle: () => void
}

const BattleContext = createContext<BattleContextType | null>(null);

export function BattleProvider({ children }: { children: ReactNode }) {

    const {
        strength, 
        dexterity, 
        constitution, 
        presence, 
        mind, 
        defense, 
        takeDamage, 
        bonusAttack, 
        actualHealth,
        name
    } = usePlayer()

    const[enemy,setEnemy] = useState<Character>(defaultCharacter)
    const[enemyHealth,setEnemyHealth] = useState(0)
    const[enemyStamina,setEnemyStamina] = useState(0)
    const[enemyDefense,setEnemyDefense] = useState(0)
    const[whoseTurn,setWhoseTurn] = useState(Challengers.none)
    const[usedAttack,setUsedAttack] = useState<UsedAttack>(defaultAtk)
    const[winner,setWinner]=useState<Challengers>(Challengers.none)

    function verifyBattle(){
        if(actualHealth==0){
            setWinner(Challengers.enemy)
        }else if(enemyHealth==0){
            setWinner(Challengers.player)
        }else{
            changeTurn()
        }
    }

    function getAtribute(attribute: Atribute, player = false): number {
        switch (attribute) {
            case Atribute.strength:
            return player ? strength : enemy.strength;
            case Atribute.dexterity:
            return player ? dexterity : enemy.dexterity;
            case Atribute.constitution:
            return player ? constitution : enemy.constitution;
            case Atribute.mind:
            return player ? mind : enemy.mind;
            case Atribute.presence:
            return player ? presence : enemy.presence;
            default:
            return 0;
        }
    }


    function changeTurn(){
        if(whoseTurn==Challengers.player){
            setWhoseTurn(Challengers.enemy)
        }else{
            setWhoseTurn(Challengers.player)
        }
    }

    const getEnemy = (e:Character)=>{
        setEnemy(e)
    }

    useEffect(()=>{
        setEnemyHealth(enemy.maxHealth)
        setEnemyStamina(enemy.maxStamina)
        setEnemyDefense(enemy.defense)
    },[enemy])

    function choiceAttack():Attack{
        const availableAttacks = enemy.equipedAttacks.filter(atk => atk.costStamina <= enemyStamina);
        if (availableAttacks.length === 0) return enemy.equipedAttacks[0]!;
        
        const randomIndex = Math.floor(Math.random() * availableAttacks.length);
        return availableAttacks[randomIndex];
    }

    const startBattle = () =>{
        const dexPlayer = testCall(dexterity,0,20,0).result;
        const dexEnemy = testCall(enemy.dexterity, 0, 20, 0).result;

        if(dexPlayer>=dexEnemy){
            setWhoseTurn(Challengers.player)
        }else{
            setWhoseTurn(Challengers.enemy)
        }
    }

    const enemyAttack = ()=>{
        setTimeout(()=>{
            const atk: Attack = choiceAttack()
            setEnemyStamina(enemyStamina-atk.costStamina)
            const statNum = getAtribute(atk.atribute)
            const attackResult = attackCall(statNum, enemy.bonusAttack, defense, atk)
            if (!attackResult.failure){
                takeDamage!(attackResult.damage!, atk.damageType)
            }
            const usedAtk: UsedAttack = {owner: enemy.name,attack :atk, ressult: attackResult}
            setUsedAttack(usedAtk)
        },1000)
        setTimeout(()=>{verifyBattle()},3800)
    }

    const takingDamage = (damage: number, type: DamageTypes) => {
        setEnemyHealth(prev => {
            const isResistent = enemy.resistences.includes(type)
            const isVulnerable = enemy.vulnerabilites.includes(type)
            const isImmune = enemy.imunites.includes(type)

            if (isImmune) return prev

            let effectiveDamage = damage
            if (isResistent) effectiveDamage = effectiveDamage / 2
            if (isVulnerable) effectiveDamage = effectiveDamage * 2

            const next = prev - Math.floor(effectiveDamage)
            return next <= 0 ? 0 : next
        })
    }

    const attackingEnemy = (atk:Attack)=>{
        const statNum = getAtribute(atk.atribute,true)
        const attackResult = attackCall(statNum, bonusAttack, enemy.defense, atk)
        if (!attackResult.failure){
            takingDamage!(attackResult.damage!, atk.damageType)
        }

        const usedAtk: UsedAttack = {owner: name,attack :atk, ressult: attackResult}
        setUsedAttack(usedAtk)

        verifyBattle()
    }

    const value:BattleContextType =
    {
        enemy,
        enemyHealth,
        enemyStamina,
        enemyDefense,
        choiceAttack,
        whoseTurn,
        getEnemy,
        enemyAttack,
        attackingEnemy,
        usedAttack,
        changeTurn,
        winner,
        startBattle
    }

    return (
        <BattleContext.Provider
            value={value}
        >
            {children}
        </BattleContext.Provider>
    );
}

export const useBattle = () => {
  const ctx = useContext(BattleContext);
  if (!ctx) throw new Error('useBattle deve estar dentro de BattleProvider');
  return ctx;
};
