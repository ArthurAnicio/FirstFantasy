/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import styles from './Coliseu.module.css';
import Image from 'next/image';
import { chalengers } from '../../../public/objects/enemies/chalengers';
import { Character } from '@/interfaces/character';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import { Leave } from '@/components/Leave';
import { useSound } from '@/contexts/SoundContext';
import { useMusic } from '@/contexts/MusicContext';

export default function Coliseu() {

  const { stopMusic } = useMusic()
  const { play, stopSound, changeSVolume } = useSound()
  const router = useRouter();
  const [challenger, setChallenger] = useState<Character | null>(null);
  const [canClick, setCanClick] = useState(true);
  const [countdown, setCountdown] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    stopMusic()
    play('Crowd.mp3',true)
    Cookies.remove('challenger');
    Cookies.remove('battleField');
  }, []);

  useEffect(() => {
    setOpacity(1);
    setTimeout(() => {
      setOpacity(0.1);
    }, 500);
  },[countdown]);

  function startCountdown() {
    stopSound("Crowd.mp3")
    changeSVolume(1)
    play("Count.mp3")
    setCountdown(5);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    changeSVolume(parseFloat(Cookies.get('soundVolume') as string))
  }
    

  function getRandomChallenger() {
    const randomIndex = Math.floor(Math.random() * chalengers.length);
    const challengerData = chalengers[randomIndex];
    setChallenger(challengerData);
    return challengerData;
  }

  const getBattleData = useCallback((challengerData: Character) => {
    Cookies.set('battleTrack', 'Video_Game_Soldier.mp3');
    Cookies.set('challenger', JSON.stringify(challengerData));
    Cookies.set('battleField', 'coliseu');
    router.push('/BattleField');
  }, [router]);

  function handleStartBattle() {
    if (!canClick) return;
    setCanClick(false);
    const challengerData = getRandomChallenger();  // Pega o mesmo!
    setTimeout(() => startCountdown(), 500);
    setTimeout(() => getBattleData(challengerData), 5500);  // Usa o MESMO!
  }

  return(
    <>
      {countdown > 0 && 
        <div className={styles.countdown}>
            <p style={{opacity}}>
              {countdown}
            </p>
        </div>
      }
      <div className={styles.container}>
          <Leave />
          <h2>Encontre seu oponente</h2>
          {challenger?.image ? (
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
          ) : (
              <div className={styles.challenger}>
                  <FontAwesomeIcon style={{height:'200px'}} icon={faQuestion} size="3x" />
                  <p>???</p>
              </div>
              
          )}
          <button 
              onClick={handleStartBattle}
              className={styles.findChallenger}
              style={{
                  cursor:canClick?'pointer':'not-allowed'
              }}
          >
              Encontrar
          </button>
      </div>
    </>
  )
}