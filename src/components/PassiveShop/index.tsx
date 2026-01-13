import styles from './PassiveShop.module.css'
import { Passives } from '@/interfaces/passives'
import { usePlayer } from '@/contexts/PlayerContext'
import { faBookBookmark} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import { applyPassive } from '@/functions/applyPassives'

interface PassiveShopProps{
    passive:Passives
}

export function PassiveShop({passive}:PassiveShopProps){

    const {technicalPoints,addPassive, changeTechnicalPoints} = usePlayer()
    const canBuy = passive.price<= technicalPoints!

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