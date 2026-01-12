'use client'
import styles from './Hospital.module.css'
import { usePlayer } from '@/contexts/PlayerContext'
import { Tratament } from '@/components/Tratament'
import { Wallet } from '@/components/Wallet'
import { Leave } from '@/components/Leave'

export default function Hospital(){

    const {maxHealth, maxStamina} = usePlayer()

    return(
        <div className={styles.container}>
            <Wallet/>
            <Leave/>
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