/* eslint-disable react-hooks/set-state-in-effect */
'use client'
import styles from './Dayly.module.css'
import { usePlayer } from '@/contexts/PlayerContext'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX, faCoins, faCalendar } from '@fortawesome/free-solid-svg-icons'
import Cookies from 'js-cookie'

interface DailyData {
  currentDay: number
  claimedDays: number[]
  lastResetDate: string
}

const REWARD_AMOUNTS = [0, 10, 15, 20, 25, 30, 35, 50]

function getTodayDate(): string {
  return new Date().toISOString().split('T')[0]
}

function loadDailyData(): DailyData {
  if (typeof window === 'undefined') {
    return { currentDay: 1, claimedDays: [], lastResetDate: getTodayDate() }
  }
  
  try {
    const raw = Cookies.get('dailyRewards')
    if (!raw) return { currentDay: 1, claimedDays: [], lastResetDate: getTodayDate() }
    
    const data = JSON.parse(raw)
    const lastDate = new Date(data.lastResetDate)
    const today = new Date()
    const daysDiff = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24))
    
    if (daysDiff >= 1) {
      const newCurrentDay = data.currentDay < 7 ? data.currentDay + 1 : 1
      const newData = {
        currentDay: newCurrentDay,
        claimedDays: newCurrentDay === 1 ? [] : data.claimedDays,
        lastResetDate: getTodayDate()
      }
      saveDailyData(newData)
      return newData
    }
    
    return data
  } catch {
    return { currentDay: 1, claimedDays: [], lastResetDate: getTodayDate() }
  }
}

function saveDailyData(data: DailyData) {
  Cookies.set('dailyRewards', JSON.stringify(data), { expires: 365 })
}

export function DaylyReward() {
  const [isOpen, setIsOpen] = useState(false)
  const { cash, changeCash } = usePlayer()
  const [dailyData, setDailyData] = useState<DailyData>(loadDailyData())
  
  useEffect(() => {
    if (isOpen) {
      setDailyData(loadDailyData())
    }
  }, [isOpen])

  function reclaim(day: number) {
    if (day !== dailyData.currentDay || dailyData.claimedDays.includes(day)) return
    
    const amount = REWARD_AMOUNTS[day]
    if (!amount) return
    
    changeCash!(cash! + amount)
    const newData = {
      ...dailyData,
      claimedDays: [...dailyData.claimedDays, day]
    }
    
    setDailyData(newData)
    saveDailyData(newData)
  }

  function isDayAvailable(day: number): boolean {
    return day === dailyData.currentDay && !dailyData.claimedDays.includes(day)
  }

  function renderRewards() {
    return Array.from({ length: 7 }, (_, i) => i + 1).map(day => (
      <div 
        key={day}
        className={styles.reward}
        id={
          dailyData.claimedDays.includes(day) 
            ? styles.reclaimed 
            : isDayAvailable(day) 
              ? styles.available 
              : ''
        }
        onClick={() => isDayAvailable(day) && reclaim(day)}
        style={{
          cursor: isDayAvailable(day) ? 'pointer' : 'default',
          opacity: day > dailyData.currentDay ? 0.5 : 1,
          scale: isDayAvailable(day) ? 1 : 0.95
        }}
      >
        <FontAwesomeIcon icon={faCoins} />
        <p>
          {dailyData.claimedDays.includes(day) 
            ? 'Já pegou' 
            : isDayAvailable(day) 
              ? `$${REWARD_AMOUNTS[day]}` 
              : 'Bloqueado'
          }
        </p>
      </div>
    ))
  }

  return (
    <div>
      {!isOpen ? (
        <div
          className={styles.iconForm}
          onClick={() => setIsOpen(true)}
        >
          <FontAwesomeIcon icon={faCalendar} />
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.modal}>
            <div className={styles.header}>
              <div style={{width:'50px', height:'50px'}}></div>
              Auxílio da Guilda
              <button className={styles.close} onClick={() => setIsOpen(false)}>
                <FontAwesomeIcon icon={faX} />
              </button>
            </div>
            <div className={styles.rewards}>
              {renderRewards()}
              <div className={styles.space}>
                <FontAwesomeIcon icon={faCalendar} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
