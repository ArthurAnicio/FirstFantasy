"use client"
import styles from './PlayerCard.module.css'
import { useGame } from '@/contexts/GameContext'
import Image from 'next/image'

export function PlayerCard(){

    const {
        name,
        image,
        level,
        xp,
        actualHealth,
        maxHealth,
        actualStamina,
        maxStamina
    } = useGame()

    return(
        <div className={styles.playerCard}>
            <div className={styles.playerInfo}>
                <p>{name}</p>
                <Image src={image} alt={name} width={150} height={150}/>
            </div>
            <div className={styles.playerStat}>

            </div>
        </div>
    )

}