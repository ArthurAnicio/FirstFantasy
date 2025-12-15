import { getDamageColor } from '@/functions/getDamageColor'
import styles from './FirstAttackChoice.module.css'
import { Attack } from '@/interfaces/attack'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins } from '@fortawesome/free-solid-svg-icons'
import { useGame } from '@/contexts/GameContext'
import { IconAtribute } from '../IconAtribute'
import { Atribute } from '@/enums/atribute'

interface AttackChoiceProps{
    attack:Attack
    price:number
}

export function FirstAttackChoice(props:AttackChoiceProps){

    const {cash,strength,dexterity,constitution,mind,presence,bonusAttack} = useGame()
    const attack = props.attack
    const color = getDamageColor(attack.damageType)

    function getAtribute(){
        switch(attack.atribute){
            case Atribute.strength:
                return strength
            case Atribute.dexterity:
                return dexterity
            case Atribute.constitution:
                return constitution
            case Atribute.mind:
                return mind
            case Atribute.presence:
                return presence
        }
    }

    return(
        <div className={styles.wraper}>
            <div className={styles.card}>
                <Image 
                    alt={attack.name} 
                    src={attack.image} 
                    width={120} 
                    height={120}
                    style={{margin:"0 auto"}}
                />
                <p className={styles.title} style={{color}}>{attack.name}</p>
                <div className={styles.stamina}>
                    <p style={{transform:"rotate(-45deg)"}}>{attack.costStamina}</p>
                </div>
            </div>
            <div className={styles.info}>
                <p style={{color}}>
                    {attack.name}
                </p>
                <p>
                    Ataque: 
                    <IconAtribute atribute={attack.atribute}/>
                    {getAtribute()} d20 {bonusAttack>0?`+${bonusAttack}`:''}
                </p>
                <p>
                    Dano: 
                    <label style={{color}}>
                        {attack.damageQuant}d{attack.damageDice} {attack.damageType}
                    </label>
                </p>
                <p>
                    Critico: {attack.criticalRatio<20? `${attack.criticalRatio}-20 ` : "20"} / x{attack.criticalBonus}
                </p>
                <p>
                    Stamina: 
                    <label style={{color:"var(--light-blue-t)"}}>
                        {attack.costStamina}
                    </label>
                </p>
            </div>
        </div>
    )
}