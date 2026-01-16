/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import styles from './BattleField.module.css'
import { BattleProvider } from '@/contexts/BattleContext'
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

export default function BattleField() {

    const {equipedAttacks, maxHealth, maxStamina} = usePlayer()
    const { playMusic } = useMusic()
    const {} = useSound()
    const {} = useBattle()
    const [quantHp, setQuantHp] = useState(2)
    const [quantSta,setQuantSta] = useState(2)
    const track = Cookies.get('battleTrack') || ''
    const backgroundImage = Cookies.get('battleField')||''
    const challenger: Character = JSON.parse(Cookies.get('challenger')||'{}')

    useEffect(()=>{},[
        playMusic(track)
    ])

    return(
        <div
            className={styles.container} 
            style={{
                backgroundImage
            : `url(/images/backgrounds/${backgroundImage}.jpg), linear-gradient(#00000080, #00000080)`,
        }}
        >
            <div className={styles.challenger}>
                <Image 
                    src={challenger.image}
                    alt={challenger.name}
                    width={200}
                    height={200}
                    style={{
                        borderRadius:'0.5rem',
                        border: '8px solid var(--black)'
                    }}
                />
                <p>{challenger.name}</p>
            </div>
            <PlayerCard/>
            <div className={styles.attacks}>
                {
                    equipedAttacks.map((atk)=>
                        <AttackItem attack={atk} inBattle={true} key={atk.id}/>
                    )
                }
                {
                    Array.from({ length: Math.max(0, 6 - equipedAttacks.length) }).map((_, i) => (
                        <EmptyAttackItem key={`empty-${i}`} />
                    ))
                }
            </div>
        </div>
    )
}