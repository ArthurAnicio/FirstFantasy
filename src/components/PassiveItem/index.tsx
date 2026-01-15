/* eslint-disable react-hooks/exhaustive-deps */
import styles from './PassiveItem.module.css'
import { Passives } from '@/interfaces/passives'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookBookmark } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { useSound } from '@/contexts/SoundContext'

interface PassiveItemProps{
    passive: Passives
    buy: (passiveId:string,newPoints:number)=>void
    shop?: boolean
    actualPoints?: number
}

export function PassiveItem(props: PassiveItemProps){

    const { play } = useSound()
    const passive = props.passive
    const [canBuy,setCanBuy] =  useState(true)

    useEffect(()=>{
        if(props.actualPoints! < passive.price){
            setCanBuy(false)
        }else{
            setCanBuy(true)
        }
    },[props.actualPoints])

    function buyPassive(){
        play("Buy.mp3")
        setTimeout(() => {
            props.buy(passive.id, props.actualPoints!-passive.price)
        }, 100);
    }

    return(
        <div className={styles.wraper}>
            <div className={styles.passiveItem}>
                <Image src={passive.image} alt={passive.name} width={150} height={150}/>
            
                <p className={styles.passiveName}>{passive.name}</p>
                {props.shop && 
                     <button 
                        className={styles.passiveCost}
                        style={{
                            background:canBuy?"var(--green-s)":"var(--red-p)"
                        }}
                        onClick={()=>buyPassive()}
                    >
                    <FontAwesomeIcon icon={faBookBookmark} />{passive.price} 
                    </button>
                }
            </div>
            
            <div className={styles.description}>
                <p>{passive.description}</p>
            </div>
        </div>
    )
        
}