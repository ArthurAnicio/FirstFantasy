"use client"
import styles from './PlayerCard.module.css'
import { usePlayer } from '@/contexts/PlayerContext'
import { Atribute } from '@/enums/atribute'
import { IconAtribute } from '@/functions/IconAtribute'
import Image from 'next/image'
import { xpNeededForNextLevel, xpLevel } from '@/functions/xpFormulas'
import { useEffect, useState } from 'react'

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
    } = usePlayer()

    const [totalXp,setTotalXp] = useState(0)
    const [remaningXp, setRemaningXp] = useState(0)

    useEffect(()=>{
        setTotalXp(xpNeededForNextLevel(level))
        setRemaningXp(xpLevel(xp))
    },[level,xp])

    return(
        <div className={styles.playerCard}>
            <div className={styles.playerInfo}>
                <p>{name}</p>
                <Image 
                    className={styles.playerImage}
                    src={image} 
                    alt={name} 
                    width={120} 
                    height={120}
                />
                <p>Level: {level}</p>
            </div>
            <div className={styles.playerStat}>
                <div className={styles.stat}>
                    <label>
                       {<IconAtribute atribute={Atribute.health}/>} 
                    </label>
                    <div className={styles.max}>
                        <div 
                            style={{
                                background:"var(--red-p)",
                                height: "100%",
                                width:`${((100*actualHealth)/maxHealth)}%`,
                            }} 
                            className={styles.actual}
                        ></div>
                        <p className={styles.nums}>
                            {actualHealth}/{maxHealth}
                        </p>
                    </div>
                </div>
                <div className={styles.stat}>
                    <label>
                       {<IconAtribute atribute={Atribute.stamina}/>} 
                    </label>
                    <div className={styles.max}>
                        <div 
                            style={{
                                background:"var(--orange-s)",
                                height: "100%",
                                width:`${((100*actualStamina)/maxStamina)}%`,
                            }} 
                            className={styles.actual}
                        ></div>
                        <p className={styles.nums}>
                            {actualStamina}/{maxStamina}
                        </p>
                    </div>
                </div>
                <div className={styles.stat}>
                    <label>
                       xp:
                    </label>
                    <div className={styles.max}>
                        <div 
                            style={{
                                background:"var(--light-blue-p)",
                                height: "100%",
                                width:`${((100*remaningXp)/totalXp)}%`,
                            }} 
                            className={styles.actual}
                        ></div>
                        <p className={styles.nums}>
                            {remaningXp}/{totalXp}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )

}