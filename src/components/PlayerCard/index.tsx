"use client"
import styles from './PlayerCard.module.css'
import { usePlayer } from '@/contexts/PlayerContext'
import Image from 'next/image'
import { xpNeededForNextLevel, xpLevel } from '@/functions/xpFormulas'
import { useEffect, useState, useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons'
import { IconAtribute } from '@/functions/IconAtribute'
import { Atribute } from '@/enums/atribute'

interface PlayerCardProps {
    openInfo: () => void
}

export function PlayerCard({ openInfo }: PlayerCardProps) {
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

    const [totalXp, setTotalXp] = useState(0)
    const [remaningXp, setRemaningXp] = useState(0)

    const xpPercent = useMemo(() => {
        if (totalXp === 0) return 0
        return Math.round((remaningXp / totalXp) * 100)
    }, [totalXp, remaningXp])

    const size = 160
    const strokeWidth = 7
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const offset = circumference * (1 - xpPercent / 100)

    useEffect(() => {
        const xpNext = xpNeededForNextLevel(level)
        setTotalXp(xpNext)
        setRemaningXp(xpLevel(xp))
    }, [level, xp])

    return (
        <div className={styles.playerCard}>
            <div className={styles.player}>
                <div className={styles.playerLevel}>
                    {level}
                </div>
                
                <svg 
                    className={styles.xpCircle} 
                    width={size} 
                    height={size} 
                    viewBox={`0 0 ${size} ${size}`}
                >
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke="var(--gray-s)"
                        strokeWidth={strokeWidth}
                        className={styles.xpTrack}
                    />
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke="url(#xpGradient)"
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        strokeDasharray={`${circumference} ${circumference}`}
                        strokeDashoffset={offset}
                        transform={`rotate(90 ${size / 2} ${size / 2})`}
                        className={styles.xpProgress}
                    />
                    <defs>
                        <linearGradient id="xpGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="var(--light-blue-s)"/>
                        </linearGradient>
                    </defs>
                </svg>

                <Image
                    className={styles.playerImage}
                    src={image}
                    alt={name}
                    width={130}
                    height={130}
                />
            </div>
            <div className={styles.playerInfo} onClick={openInfo}>
                <FontAwesomeIcon icon={faBookOpen} />
            </div>
            <div className={styles.playerStats}>
                <div
                    className={styles.statBar}
                >
                    <p className={styles.statNum}>
                        {actualHealth}/{maxHealth}
                    </p>
                    <div
                        style={{
                            height:'100%',
                            width: `${((actualHealth*100)/maxHealth)+27}%`,
                            background: 'var(--red-p)'
                        }}
                    />
                </div>
                <div 
                    className={styles.statBar}
                >
                    <p className={styles.statNum}>
                        {actualStamina}/{maxStamina}
                    </p>
                    <div
                        style={{
                            height:'100%',
                            width: `${((actualStamina*100)/maxStamina)+30}%`,
                            background: 'var(--orange-p)'
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
