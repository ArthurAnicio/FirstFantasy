import styles from './PassiveItem.module.css'
import { Passives } from '@/interfaces/passives'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'

interface PassiveItemProps{
    passive: Passives
    buy: (passiveId:string,newCash:number)=>void
    shop?: boolean
    actualCash?: number
}

export function PassiveItem(props: PassiveItemProps){

    const passive = props.passive
    const [canBuy,setCanBuy] =  useState(true)

    useEffect(()=>{
        if(props.actualCash! < passive.price){
            setCanBuy(false)
        }else{
            setCanBuy(true)
        }
    },[props.actualCash])

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
                        onClick={()=>{if(canBuy)props.buy(passive.id,props.actualCash!-passive.price)}}
                    >
                    {passive.price} <FontAwesomeIcon icon={faCoins} />
                    </button>
                }
            </div>
            
            <div className={styles.description}>
                <p>{passive.description}</p>
            </div>
        </div>
    )
        
}