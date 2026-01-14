import styles from './PassiveShop.module.css'
import { Passives } from '@/interfaces/passives'
import { usePlayer } from '@/contexts/PlayerContext'
import { faBookBookmark} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import { Atribute } from '@/enums/atribute'
import { BonusTypes } from '@/enums/bonusTypes'

interface PassiveShopProps{
    passive:Passives
}

export function PassiveShop({passive}:PassiveShopProps){

    const {
        technicalPoints,
        addPassive, 
        changeTechnicalPoints,
        changeStat,
        bonusAttackUp,
        healthBonusUp,
        defenseBonusUp,
        staminaBonusUp,
        addResistence,
        addVulnerabilite,
        addImunite,
        attacks,
        equipedAttacks
    } = usePlayer()
    const canBuy = passive.price<= technicalPoints!

    function applyPassive(passive: Passives){

        switch(passive.typeBonus){
            case BonusTypes.bonusCriticalDamage:
            attacks.forEach((atk)=>{
                atk.criticalBonus += passive.bonusNum
            })
            equipedAttacks.forEach((atk)=>{
                atk.criticalBonus += passive.bonusNum
            })
            break
            case BonusTypes.bonusCriticalRatio:
            attacks.forEach((atk)=>{
                atk.criticalRatio -= passive.bonusNum
            })
            equipedAttacks.forEach((atk)=>{
                atk.criticalRatio -= passive.bonusNum
            })
            break
            case BonusTypes.bonusAttack:
            bonusAttackUp!(passive.bonusNum)
            break
            case BonusTypes.bonusDefense:
            defenseBonusUp!(passive.bonusNum)
            break
            case BonusTypes.bonusHp:
            healthBonusUp!(passive.bonusNum)
            break
            case BonusTypes.bonusStamina:
            staminaBonusUp!(passive.bonusNum)
            break
            case BonusTypes.resistence:
            addResistence!(passive.bonusDamageType)
            break
            case BonusTypes.vulnerabilite:
            addVulnerabilite!(passive.bonusDamageType)
            break
            case BonusTypes.imunite:
            addImunite!(passive.bonusDamageType)
            break
            case BonusTypes.bonusStat:
            switch(passive.bonusStat){
                case Atribute.constitution:
                    changeStat!(Atribute.constitution,1)
                    break
                case Atribute.strength:
                    changeStat!(Atribute.strength,1)
                    break
                case Atribute.dexterity:
                    changeStat!(Atribute.dexterity,1)
                    break
                case Atribute.mind:
                    changeStat!(Atribute.mind,1)
                    break
                case Atribute.presence:
                    changeStat!(Atribute.presence,1)
                    break
            }
        }

    }

    function buyPassive(){
        if(canBuy){
            changeTechnicalPoints!(technicalPoints!-passive.price)
            addPassive!(passive)
            applyPassive(passive)
        }
    }
    
    return(
        <div className={styles.wraper}>
            <div className={styles.passiveItem}>
                <Image src={passive.image} alt={passive.name} width={150} height={150}/>
            
                <p className={styles.passiveName}>{passive.name}</p>
                <button 
                    className={styles.passiveCost}
                    style={{
                        background:canBuy?"var(--green-s)":"var(--red-p)"
                    }}
                    onClick={buyPassive}
                >
                    {passive.price} <FontAwesomeIcon icon={faBookBookmark} />
                </button>
            </div>
            
            <div className={styles.description}>
                <p>{passive.description}</p>
            </div>
        </div>
    )

}