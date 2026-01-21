/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePlayer } from '@/contexts/PlayerContext';
import styles from './page.module.css'
import { ModalConfirm } from '@/components/ModalConfirm';
import { useMusic } from '@/contexts/MusicContext';

export default function Home() {

  const [isPlaying, setIsPlaying]=useState(false)
  const [blink, setBlink]=useState(true)
  const { playMusic, stopMusic } = useMusic()
  const router = useRouter()
  const {name} = usePlayer()
  const [canContinue,setCanContinue] = useState(true)
  const [modalOn, setModalOn] = useState(false)

  useEffect(()=>{
    if(blink==true){
      setTimeout(()=>{
        setBlink(false)
      }, 800)
    }else{
      setTimeout(()=>{
        setBlink(true)
      }, 800)
    }
  },[blink])

  useEffect(()=>{
    stopMusic()
    if(name!=""){
      setCanContinue(true)
    }else{
      setCanContinue(false)
    }
  },[])

  function continueNavi(){
    if(canContinue){
      stopMusic()
      router.push('/City')
    }
  }

  function startPlay(){
    playMusic('Nature_Nurture.mp3')
    setIsPlaying(true)
  }

  return (
    <div className={styles.container}>
      <div 
        className={styles.overlay} 
        onClick={startPlay}
        style={{
          opacity: isPlaying?0:1,
          zIndex: isPlaying?-1:12
        }}
      >
        <p style={{opacity: blink?1:0}}>
          --Clique na tela para começar--
        </p>
      </div>
      <div 
        className={styles.title}
        style={{
          top:isPlaying?40:160,
          fontSize:isPlaying?'90px':'135px',
          width:isPlaying?'600px':'800px'
        }}
      >
        First Fantasy
      </div>
      <button 
        className={styles.btn}
        id={canContinue?"":styles.disable}
        onClick={continueNavi}
      >
        Continuar
      </button>
      <button 
        className={styles.btn}
        onClick={()=>setModalOn(true)}
      >
        Novo Jogo
      </button>
      <p className={styles.version}>v0.0.1-alpha</p>
      {modalOn?
        <ModalConfirm url={'/CharacterCreation'} cancel={()=>setModalOn(false)}/>
        :false
      }
    </div>
  );
}
