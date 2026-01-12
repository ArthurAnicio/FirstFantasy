import styles from './PassiveShop.module.css'
import { Passives } from '@/interfaces/passives'
import { usePlayer } from '@/contexts/PlayerContext'
import { faCoins } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'

interface PassiveShopProps{
    passive:Passives
}

export function PassiveShop({passive}:PassiveShopProps){

    const {cash,addPassive, changeCash} = usePlayer()
    const canBuy = passive.price<= cash!

    function buyPassive(){
        if(canBuy){
            changeCash!(cash!-passive.price)
            addPassive!(passive)
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
                    {passive.price} <FontAwesomeIcon icon={faCoins} />
                </button>
            </div>
            
            <div className={styles.description}>
                <p>{passive.description}</p>
            </div>
        </div>
    )

}