/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import styles from './BattleField.module.css'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useMusic } from '@/contexts/MusicContext'
import { useSound } from '@/contexts/SoundContext'
import { usePlayer } from '@/contexts/PlayerContext'
import { useBattle } from '@/contexts/BattleContext'
import Image from 'next/image'
import { Character } from '@/interfaces/character'
import { PlayerCard } from '@/components/PlayerCard'
import { AttackItem } from '@/components/AttackItem'
import { EmptyAttackItem } from '@/components/EmptyAttackItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPersonRunning, faFlask,faScroll } from '@fortawesome/free-solid-svg-icons'
import { Challengers } from '@/contexts/BattleContext'
import { getDamageColor } from '@/functions/getDamageColor'
import { getDamageIcon } from '@/functions/getDamageIcon'

enum Actions{
    attack,
    recover,
    none
}

export default function BattleField() {

    const {equipedAttacks, maxHealth, maxStamina, name} = usePlayer()
    const { playMusic } = useMusic()
    const {} = useSound()
    const {
        enemyHealth, 
        enemyStamina, 
        getEnemy,  
        whoseTurn, 
        startBattle, 
        enemyAttack,
        usedAttack,
        changeTurn
    } = useBattle()
    const [quantHp, setQuantHp] = useState(2)
    const [quantSta,setQuantSta] = useState(2)
    const track = Cookies.get('battleTrack') || ''
    const backgroundImage = Cookies.get('battleField')||''
    const challenger: Character = JSON.parse(Cookies.get('challenger')||'{}')
    const [attacked, setAttacked] = useState(false)
    const [colorTurn, setColorTurn] = useState('')
    const [wichAction, setWichAction] = useState(Actions.none)

    useEffect(()=>{
        playMusic(track)
        getEnemy(challenger)
        setTimeout(()=>{startBattle()},3000)
    },[])

    useEffect(()=>{
        if(whoseTurn == Challengers.enemy){
            setColorTurn('var(--red-p)')
            enemyAttack()
        }else{
            setColorTurn('var(--blue-t)')
        }
    },[whoseTurn])

    useEffect(()=>{
        setAttacked(true)
        setTimeout(()=>{setAttacked(false)},1500)
    },[usedAttack])

    return(
        <div
            className={styles.container} 
            style={{
                backgroundImage
                : `url(/images/backgrounds/${backgroundImage}.jpg), linear-gradient(#00000080, #00000080)`,
            }}
        >
            <div 
                className={styles.whoseTurn} 
                style={{
                    borderBottom: `solid 5px ${colorTurn}`,
                    color: colorTurn
                }}
            >
                Turno de {whoseTurn == Challengers.enemy? challenger.name : name}
            </div>
            <PlayerCard/>
            <div className={styles.enemyCard}>
                <div className={styles.enemy}>
                    <div className={styles.enemyLevel}>
                        {challenger.level}
                    </div>
                    <Image
                        className={styles.enemyImage}
                        src={challenger.image}
                        alt={challenger.name}
                        width={130}
                        height={130}
                    />
                </div>
                <div className={styles.enemyStats}>
                    <div
                        className={styles.statBar}
                    >
                        <p className={styles.statNum}>
                            {enemyHealth}/{challenger.maxHealth}
                        </p>
                        <div
                            style={{
                                height:'100%',
                                width: `${((enemyHealth*100)/challenger.maxHealth)}%`,
                                background: 'var(--red-p)'
                            }}
                        />
                    </div>
                    <div 
                        className={styles.statBar}
                    >
                        <p className={styles.statNum}>
                            {enemyStamina}/{challenger.maxStamina}
                        </p>
                        <div
                            style={{
                                height:'100%',
                                width: `${((enemyStamina*100)/challenger.maxStamina)}%`,
                                background: 'var(--orange-p)'
                            }}
                        />
                    </div>
                </div>
            </div>
            {   usedAttack.attack.name != '' &&
                <div 
                    className={styles.attackInfo}
                    style={{
                        opacity: attacked?1:0,
                        bottom: attacked?250:210
                    }}
                >
                    <p>{usedAttack.owner} usou {usedAttack.attack.name}</p>
                    <p>Ataque: {usedAttack.ressult.result}</p>
                    { usedAttack.ressult.failure?
                        <p>
                            Errou!
                        </p>
                        :
                        <p style={{color:getDamageColor(usedAttack.attack.damageType)}}>
                            Dano: {usedAttack.ressult.critical&& 'Críico'} {usedAttack.ressult.damage} {getDamageIcon(usedAttack.attack.damageType)}
                        </p>
                    }
                </div>
            }
            <div 
                className={styles.skipTurn} 
                onClick={changeTurn}
                style={{
                    opacity: whoseTurn==Challengers.player? 1 : 0
                }}
            >
                <FontAwesomeIcon icon={faPersonRunning}/>
                Passar turno
            </div>
            <div 
                className={styles.utils} 
                id={wichAction==Actions.recover?styles.utilsS:''}
                onClick={()=>setWichAction(Actions.recover)}
                style={{
                    opacity: whoseTurn==Challengers.player? 1 : 0,
                    bottom: whoseTurn==Challengers.player? 210 : 180,
                    left: whoseTurn==Challengers.player? 15 : 200
                }}
            >
                <FontAwesomeIcon icon={faFlask}/>
                Recuperar
            </div>
            <div 
                className={styles.attacksButton} 
                id={wichAction==Actions.attack?styles.attacksButtonS:''}
                onClick={()=>setWichAction(Actions.attack)}
                style={{
                    opacity: whoseTurn==Challengers.player? 1 : 0,
                    bottom: whoseTurn==Challengers.player? 240 : 180
                }}
            >
                <FontAwesomeIcon icon={faScroll}/>
                Ataques
            </div>
        </div>
    )
}