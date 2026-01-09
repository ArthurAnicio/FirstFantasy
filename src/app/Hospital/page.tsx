'use client'
import styles from './Hospital.module.css'
import { usePlayer } from '@/contexts/PlayerContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet } from '@fortawesome/free-solid-svg-icons'
import { Tratament } from '@/components/Tratament'

export default function Hospital(){

    const {cash, maxHealth, maxStamina} = usePlayer()

    return(
        <div className={styles.container}>
            <div className={styles.wallet}>
                <FontAwesomeIcon icon={faWallet}/>
                {cash}
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
                </div>
            </div>
            
        </div>
        
    )

}