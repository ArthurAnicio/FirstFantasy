'use client'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useRef, useCallback } from 'react'
import styles from './City.module.css'
import {PlayerCard} from '@/components/PlayerCard'
import { usePlayer } from '@/contexts/PlayerContext'
import {Building} from '@/components/Building'
import {PlayerInfo} from '@/components/PlayerInfo'

export default function Player() {
  const { takeDamage, useStamina, addXp, setXp, recover } = usePlayer()
  const router = useRouter()
  const modalOn = useState(false)
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

  const setModalOn = (value: boolean) => modalOn[1](value)

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
        </div>
      </div>
      
      {modalOn[0] && <PlayerInfo close={() => setModalOn(false)} />}
      <PlayerCard openInfo={() => setModalOn(true)} />
    </>
  )
}
