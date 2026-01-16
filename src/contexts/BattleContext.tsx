/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { createContext, useContext, ReactNode, useState, useEffect, useCallback } from 'react';
import { usePlayer } from './PlayerContext';
import { Character } from '@/interfaces/character';
import { attackCall } from '@/functions/attackCall';
import { Attack } from '@/interfaces/attack';
import { Atribute } from '@/enums/atribute';
import { DamageTypes } from '@/enums/damageTypes';
import { defaultCharacter } from './PlayerContext';
import { defaultAttacks } from '../../public/objects/attacks/defaultAttacks';
import { TestResult } from '@/interfaces/testResult';
enum Challengers{
    enemy,
    player,
    none
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
    usedAttack: Attack
    changeUsedAttack: (attack:Attack)=>void
    changeTurn: ()=>void
    resultAttack: TestResult
    winner: Challengers
}

const BattleContext = createContext<BattleContextType | null>(null);

export function BattleProvider({ children }: { children: ReactNode }) {

    const {strength, dexterity, constitution, presence, mind, defense, takeDamage, bonusAttack, actualHealth} = usePlayer()

    const[enemy,setEnemy] = useState<Character>(defaultCharacter)
    const[enemyHealth,setEnemyHealth] = useState(0)
    const[enemyStamina,setEnemyStamina] = useState(0)
    const[enemyDefense,setEnemyDefense] = useState(0)
    const[whoseTurn,setWhoseTurn] = useState(Challengers.enemy)
    const[resultAttack, setResultAttack] = useState<TestResult>({damage:0, result: 0, critical: false, failure: true})
    const[usedAttack,setUsedAttack] = useState<Attack>(defaultAttacks[0])
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

    function choiceAttack(): Attack {
        const availableAttacks = enemy.equipedAttacks.filter(atk => atk.costStamina > enemyStamina);
        if (availableAttacks.length === 0) return enemy.equipedAttacks[0]!;
        
        const randomIndex = Math.floor(Math.random() * availableAttacks.length);
        return availableAttacks[randomIndex];
    }

    const enemyAttack = ()=>{
        const atk: Attack = choiceAttack()
        setEnemyStamina(enemyStamina-atk.costStamina)
        const statNum = getAtribute(atk.atribute)
        const attackResult = attackCall(statNum, enemy.bonusAttack, defense, atk)
        if (!attackResult.failure){
            takeDamage!(attackResult.damage!, atk.damageType)
        }
        setResultAttack(attackResult)
        verifyBattle()
    }

    const takingDamage = useCallback(
        (damage: number, type: DamageTypes) => {
          setEnemyHealth(prev => {
            const isResistent = enemy.resistences.includes(type)
            const isVulnerable = enemy.vulnerabilites.includes(type)
            const isImmune = enemy.imunites.includes(type)
    
            if (isImmune) return prev
    
            let effectiveDamage = damage
            if (isResistent) effectiveDamage = effectiveDamage / 2
            if (isVulnerable) effectiveDamage = effectiveDamage * 2
    
            const next = prev - effectiveDamage
            return next <= 0 ? 0 : next
          })
        },
        [],
    )

    const attackingEnemy = (atk:Attack)=>{
        const statNum = getAtribute(atk.atribute)
        const attackResult = attackCall(statNum, bonusAttack, enemy.defense, atk)
        if (!attackResult.failure){
            takingDamage!(attackResult.damage!, atk.damageType)
        }
        setResultAttack(attackResult)
        verifyBattle()
    }

    const changeUsedAttack = (atk:Attack)=>{
        setUsedAttack(atk)
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
        changeUsedAttack,
        changeTurn,
        resultAttack,
        winner
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
