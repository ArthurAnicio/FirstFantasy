'use client'
import styles from './Hospital.module.css'
import { usePlayer } from '@/contexts/PlayerContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet, faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import { Tratament } from '@/components/Tratament'
import { useRouter } from 'next/navigation'

export default function Hospital(){

    const {cash, maxHealth, maxStamina} = usePlayer()

    const router = useRouter()

    return(
        <div className={styles.container}>
            <div className={styles.wallet}>
                <FontAwesomeIcon icon={faWallet}/>
                {cash}
            </div>
            <div className={styles.leave} onClick={()=>router.push('/City')}>
                <FontAwesomeIcon icon={faDoorOpen}/>
            </div>
            <div className={styles.content}>
                <p>Escolha seu Tratamento</p>
                <div className={styles.trataments}>
                    <Tratament
                        title='Básico'
                        desc='Recupera 1/4 da vida e da stamina'
                        health={Math.floor(maxHealth/4)}
                        stamina={Math.floor(maxStamina/4)}
                        price={10}
                    />
                    <Tratament
                        title='Repouso'
                        desc='Recupera 1/4 da vida e metade da stamina'
                        health={Math.floor(maxHealth/4)}
                        stamina={Math.floor(maxStamina/2)}
                        price={20}
                    />
                    <Tratament
                        title='Sutura'
                        desc='Recupera metade da vida e 1/4 da stamina'
                        health={Math.floor(maxHealth/4)}
                        stamina={Math.floor(maxStamina/4)}
                        price={20}
                    />
                    <Tratament
                        title='Avançado'
                        desc='Recupera metade da vida e da stamina'
                        health={Math.floor(maxHealth/4)}
                        stamina={Math.floor(maxStamina/4)}
                        price={50}
                    />
                </div>
            </div>
            
        </div>
        
    )

}