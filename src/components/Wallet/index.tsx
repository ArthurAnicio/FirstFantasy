import styles from './Wallet.module.css'
import { usePlayer } from '@/contexts/PlayerContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet, faBookBookmark } from '@fortawesome/free-solid-svg-icons'

interface WalletProps{
    isCash:boolean
}

export function Wallet({isCash}:WalletProps){
    
    const {cash, technicalPoints} = usePlayer()

    return(
            <div className={styles.wallet}>
                <FontAwesomeIcon icon={isCash? faWallet : faBookBookmark}/>
                {isCash? cash : technicalPoints}
            </div>
    )
}