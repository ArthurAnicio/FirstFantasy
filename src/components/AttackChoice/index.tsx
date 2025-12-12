import { getDamageColor } from '@/functions/getDamageColor'
import styles from './AttackChoice.module.css'
import { Attack } from '@/interfaces/attack'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins } from '@fortawesome/free-solid-svg-icons'
import { useGame } from '@/contexts/GameContext'

interface AttackChoiceProps{
    attack:Attack
    price:number
}

export function AttackChoice(props:AttackChoiceProps){

    const {cash} = useGame()
    const attack = props.attack
    const color = getDamageColor(attack.damageType)
    
    return(
        <div className={styles.card}>
            <Image 
                alt={attack.name} 
                src={attack.image} 
                width={120} 
                height={120}
                style={{margin:"0 auto"}}
            />
            <p className={styles.title}>{attack.name}</p>
            <div className={styles.stamina}>
                <p style={{transform:"rotate(-45deg)"}}>{attack.costStamina}</p>
            </div>
        </div>
    )
}