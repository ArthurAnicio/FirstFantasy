import styles from './PassiveItem.module.css'
import { Passives } from '@/interfaces/passives'
import Image from 'next/image'

interface PassiveItemProps{
    passive: Passives
    buy?: (passiveId:string,newCash:number)=>void
    shop?: boolean
}

export function PassiveItem(props: PassiveItemProps){

    const passive = props.passive

    return(
        <div className={styles.passiveItem}>
            <Image src={passive.image} alt={passive.name} width={150} height={150}/>
            <div className={styles.passiveInfo}>
                <p className={styles.passiveName}>{passive.name}</p>
                <p className={styles.passiveDescription}>{passive.description}</p>
                {props.shop && 
                    <p className={styles.passiveCost}>Custo: {passive.price} pontos</p>
                }
            </div>
        </div>
    )
}