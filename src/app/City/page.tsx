/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useRef, useCallback } from 'react'
import styles from './City.module.css'
import {PlayerCard} from '@/components/PlayerCard'
import { usePlayer } from '@/contexts/PlayerContext'
import {Building} from '@/components/Building'
import {PlayerInfo} from '@/components/PlayerInfo'
import { DaylyReward } from '@/components/DaylyReward'
import { LevelUpModal } from '@/components/LevelUpModal'
import { DamageTypes } from '@/enums/damageTypes'

export default function Player() {
  const { takeDamage, addXp, setXp, level} = usePlayer()
  const router = useRouter()
  const [playerInfoOn,setPlayerInfoOn] = useState(false)
  const [levelUpModalOn,setLevelUpModalOn] = useState(false)
  const cityRef = useRef<HTMLDivElement>(null)

  const scrollSpeed = 70

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (cityRef.current) {
      switch (e.key) {
        case 'ArrowLeft':
          cityRef.current.scrollBy({ left: -scrollSpeed, behavior: 'smooth' })
          break
        case 'ArrowRight':
          cityRef.current.scrollBy({ left: scrollSpeed, behavior: 'smooth' })
          break
        case 'ArrowUp':
          cityRef.current.scrollBy({ top: -scrollSpeed, behavior: 'smooth' })
          break
        case 'ArrowDown':
          cityRef.current.scrollBy({ top: scrollSpeed, behavior: 'smooth' })
          break
      }
    }
  }, [])

  useEffect(() => {
    const auth = Cookies.get('carregado')
    if (auth !== 'sim') router.push('/')
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  useEffect(() => {
  const raw = Cookies.get('lastLevelSeen')
  let savedLevel = 1
  
  if (raw) {
    const parsed = Number(raw)
    savedLevel = isNaN(parsed) ? 1 : parsed
  }
  
  if (level > savedLevel) {
    setLevelUpModalOn(true)
    Cookies.set('lastLevelSeen', String(level), { expires: 365 })
  }
}, [level])

  return (
    <>
      <div className={styles.container}>
        <div className={styles.city} ref={cityRef}>
          <Building 
            image="/images/buildings/coliseu.gif" 
            name="Coliseu" 
            top={470} 
            left={900}
            w={200} 
            h={200}
            path='/coliseu' 
          />
          <Building 
            image="/images/buildings/hospital.png" 
            name="Hospital" 
            top={200} 
            left={200}
            w={200} 
            h={200}
            path='/Hospital' 
          />
          <Building 
            image="/images/buildings/treinamento.png" 
            name="Treinamento" 
            top={200} 
            left={500}
            w={200} 
            h={200}
            path='/Training' 
          />
        </div>
      </div>
      <button onClick={() => addXp!(200)}>Adicionar xp</button>
      <button onClick={() => takeDamage!(10,DamageTypes.fire)}>Dano</button>
      <button onClick={() => setXp!(0)}>Zerar xp</button>
      {levelUpModalOn && <LevelUpModal close={() => setLevelUpModalOn(false)} />}
      {playerInfoOn && <PlayerInfo close={() => setPlayerInfoOn(false)} />}
      <PlayerCard openInfo={() => setPlayerInfoOn(true)} />
      <DaylyReward/>
    </>
  )
}
