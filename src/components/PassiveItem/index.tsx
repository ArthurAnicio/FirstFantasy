import styles from './PassiveItem.module.css'
import { Passives } from '@/interfaces/passives'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookBookmark } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'

interface PassiveItemProps{
    passive: Passives
    buy: (passiveId:string,newPoints:number)=>void
    shop?: boolean
    actualPoints?: number
}

export function PassiveItem(props: PassiveItemProps){

    const passive = props.passive
    const [canBuy,setCanBuy] =  useState(true)

    useEffect(()=>{
        if(props.actualPoints! < passive.price){
            setCanBuy(false)
        }else{
            setCanBuy(true)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.actualPoints])

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
                        onClick={()=>{
                            if(canBuy){
                                props.buy(passive.id, props.actualPoints!-passive.price)
                            }
                        }}
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