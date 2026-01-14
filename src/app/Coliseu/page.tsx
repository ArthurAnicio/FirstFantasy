'use client';
import styles from './Coliseu.module.css';
import Image from 'next/image';
import { chalengers } from '../../../public/objects/enemies/chalengers';
import { Character } from '@/interfaces/character';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import { Leave } from '@/components/Leave';

export default function Coliseu() {

  const router = useRouter();
  const [challenger, setChallenger] = useState<Character | null>(null);
  const [canClick, setCanClick] = useState(true);

  function getRandomChallenger() {
    const randomIndex = Math.floor(Math.random() * chalengers.length);
    setChallenger(chalengers[randomIndex]);
  }

  function handleStartBattle() {
    if (!canClick) return;
    setCanClick(false);
    getRandomChallenger();
    setTimeout(() => {
      Cookies.set('challenger', JSON.stringify(challenger!));
      Cookies.set('battleField', 'coliseuArena');
      router.push('/BattleField');
    }, 2000);
  }

  return(
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
  )
}