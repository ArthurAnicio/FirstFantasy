import styles from './Wallet.module.css'
import { usePlayer } from '@/contexts/PlayerContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet } from '@fortawesome/free-solid-svg-icons'

export function Wallet(){
    
    const {cash} = usePlayer()

    return(
            <div className={styles.wallet}>
                <FontAwesomeIcon icon={faWallet}/>
                {cash}
            </div>
    )
}