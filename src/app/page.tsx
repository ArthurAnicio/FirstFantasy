"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePlayer } from '@/contexts/PlayerContext';
import styles from './page.module.css'
import { ModalConfirm } from '@/components/ModalConfirm';
import Cookies from 'js-cookie';

export default function Home() {

  const router = useRouter()
  const {name} = usePlayer()
  const [canContinue,setCanContinue] = useState(true)
  const [modalOn, setModalOn] = useState(false)

  useEffect(()=>{
    if(name!=""){
      setCanContinue(true)
      Cookies.set("carregado","sim")
    }else{
      setCanContinue(false)
      Cookies.set("carregado","")
    }
  },[])

  useEffect(()=>{
    Cookies.set("criando","")
  })

  function continueNavi(){
    if(canContinue){
      Cookies.set("carregado","sim")
      router.push('/pages/PlayerArea')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
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
        <ModalConfirm url={'/pages/CharacterCreation'} cancel={()=>setModalOn(false)}/>
        :false
      }
    </div>
  );
}
