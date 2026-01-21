'use client'
import { createContext, useContext, ReactNode, useState, useEffect } from 'react'
import { usePlayer } from './PlayerContext'
import { Character } from '@/interfaces/character'
import { testCall } from '@/functions/testCall'
import { attackCall } from '@/functions/attackCall'
import { Attack } from '@/interfaces/attack'
import { Atribute } from '@/enums/atribute'
import { DamageTypes } from '@/enums/damageTypes'
import { defaultCharacter } from './PlayerContext'
import { TestResult } from '@/interfaces/testResult'
import { EffectTypes } from '@/enums/effectTypes'
import { damageSound } from '@/functions/damageSound'
import { useSound } from './SoundContext'

export enum Challengers {
    enemy,
    player,
    none
}

export interface UsedAttack {
    owner: string
    attack: Attack
    ressult: TestResult
}

const defaultAtk: UsedAttack = {
    owner: '',
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

interface BattleContextType {
    enemy: Character
    enemyHealth: number
    enemyStamina: number
    enemyDefense: number
    enemyReady: boolean
    whoseTurn: Challengers
    usedAttack: UsedAttack
    winner: Challengers

    getEnemy: (enemy: Character) => void
    startBattle: () => void
    enemyAttack: () => void
    attackingEnemy: (attack: Attack) => void
    changeTurn: () => void
    resetBattle: () => void
}

const BattleContext = createContext<BattleContextType | null>(null)

export function BattleProvider({ children }: { children: ReactNode }) {

    const { play } = useSound()

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
        name,
        useStamina
    } = usePlayer()

    const [enemy, setEnemy] = useState<Character>(defaultCharacter)
    const [enemyHealth, setEnemyHealth] = useState(10)
    const [enemyStamina, setEnemyStamina] = useState(0)
    const [enemyDefense, setEnemyDefense] = useState(0)
    const [enemyReady, setEnemyReady] = useState(false)
    const [whoseTurn, setWhoseTurn] = useState<Challengers>(Challengers.none)
    const [usedAttack, setUsedAttack] = useState<UsedAttack>(defaultAtk)
    const [winner, setWinner] = useState<Challengers>(Challengers.none)

    function sfx(testResult:TestResult,atk:Attack){
        if(testResult.failure){
            play('Fail.mp3')
        }else{
            play(damageSound(atk.damageType))
        }
    }

    const resetBattle = () => {
        setEnemy(defaultCharacter)
        setEnemyHealth(10)
        setEnemyStamina(0)
        setEnemyDefense(0)
        setEnemyReady(false)
        setWhoseTurn(Challengers.none)
        setUsedAttack(defaultAtk)
        setWinner(Challengers.none)
    }

    useEffect(() => {
        if (!enemyReady) return
        if (winner !== Challengers.none) return
        if (whoseTurn === Challengers.none) return

        if (actualHealth <= 0) {
            setWinner(Challengers.enemy)
            setWhoseTurn(Challengers.none)
        } else if (enemyHealth <= 0) {
            setWinner(Challengers.player)
            setWhoseTurn(Challengers.none)
        }
    }, [actualHealth, enemyHealth, whoseTurn, enemyReady, winner])


    function changeTurn() {
        if (winner !== Challengers.none) return

        setWhoseTurn(prev =>
            prev === Challengers.player
                ? Challengers.enemy
                : Challengers.player
        )
    }
    function getAtribute(attribute: Atribute, player = false): number {
        switch (attribute) {
            case Atribute.strength:
                return player ? strength : enemy.strength
            case Atribute.dexterity:
                return player ? dexterity : enemy.dexterity
            case Atribute.constitution:
                return player ? constitution : enemy.constitution
            case Atribute.mind:
                return player ? mind : enemy.mind
            case Atribute.presence:
                return player ? presence : enemy.presence
            default:
                return 0
        }
    }
    const getEnemy = (e: Character) => {
        setEnemy(e)
    }

    useEffect(() => {
        if (!enemy || enemy.maxHealth === 0) return

        setEnemyHealth(enemy.maxHealth)
        setEnemyStamina(enemy.maxStamina)
        setEnemyDefense(enemy.defense)
        setEnemyReady(true)
    }, [enemy])

    function choiceAttack(): Attack {
        const available = enemy.equipedAttacks.filter(
            atk => atk.costStamina <= enemyStamina
        )

        if (available.length === 0) return enemy.equipedAttacks[0]!
        return available[Math.floor(Math.random() * available.length)]
    }

    const startBattle = () => {
        const dexPlayer = testCall(dexterity, 0, 20, 0).result
        const dexEnemy = testCall(enemy.dexterity, 0, 20, 0).result

        setWhoseTurn(
            dexPlayer >= dexEnemy ? Challengers.player : Challengers.enemy
        )
    }

    const enemyAttack = () => {
        if (winner !== Challengers.none) return

        setTimeout(() => {
            const atk = choiceAttack()
            setEnemyStamina(prev => prev - atk.costStamina)

            const statNum = getAtribute(atk.atribute)
            const result = attackCall(statNum, enemy.bonusAttack, defense, atk)

            sfx(result,atk)

            if (!result.failure) {
                takeDamage!(result.damage!, atk.damageType)
            }

            setUsedAttack({
                owner: enemy.name,
                attack: atk,
                ressult: result
            })
        }, 1000)

        setTimeout(changeTurn, 3800)
    }

    const attackingEnemy = (atk: Attack) => {
        if (winner !== Challengers.none) return

        setTimeout(() => {
            const statNum = getAtribute(atk.atribute, true)
            const result = attackCall(statNum, bonusAttack, enemy.defense, atk)

            useStamina!(atk.costStamina)
            sfx(result,atk)

            if (!result.failure) {
                setEnemyHealth(prev => {
                    const dmg = Math.floor(result.damage!)
                    return Math.max(prev - dmg, 0)
                })
            }

            setUsedAttack({
                owner: name,
                attack: atk,
                ressult: result
            })
        }, 1000)

        setTimeout(changeTurn, 3800)
    }

    return (
        <BattleContext.Provider
            value={{
                enemy,
                enemyHealth,
                enemyStamina,
                enemyDefense,
                enemyReady,
                whoseTurn,
                usedAttack,
                winner,
                getEnemy,
                startBattle,
                enemyAttack,
                attackingEnemy,
                changeTurn,
                resetBattle
            }}
        >
            {children}
        </BattleContext.Provider>
    )
}

export const useBattle = () => {
    const ctx = useContext(BattleContext)
    if (!ctx) throw new Error('useBattle deve estar dentro de BattleProvider')
    return ctx
}
