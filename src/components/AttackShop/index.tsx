import { IconAtribute } from '@/functions/IconAtribute'
import styles from './AttackShop.module.css'
import { usePlayer } from '@/contexts/PlayerContext'
import Image from 'next/image'
import { Atribute } from '@/enums/atribute'
import { getDamageColor } from '@/functions/getDamageColor'
import { getDamageIcon } from '@/functions/getDamageIcon'
import { Attack } from '@/interfaces/attack'

interface AttackShopProps{
    attack: Attack
    price: number
}

export function AttackShop({attack, price}:AttackShopProps){

    const {
            strength,
            dexterity,
            constitution,
            mind,
            presence,
            bonusAttack,
            cash,
            addAttack,
            changeCash
        } = usePlayer()
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

    function buyAttack(){
        if(cash!>=price){
            changeCash!(cash!-price)
            addAttack!(attack)
        }
    }

    return(
         <div className={styles.wraper}>
            <div 
                className={styles.card}
            >
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
                <div 
                    className={styles.price} 
                    style={{background:cash!>=price?'var(--green-s)':'var(--red-p)'}}
                    onClick={buyAttack}
                >
                    ${price}
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
                        {attack.damageQuant}d{attack.damageDice} {getDamageIcon(attack.damageType)}{attack.damageType}
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