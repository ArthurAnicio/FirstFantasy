import styles from './Leave.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/navigation'

export function Leave(){

    const router = useRouter()

    return(
        
        <div className={styles.leave} onClick={()=>router.push('/City')}>
            <FontAwesomeIcon icon={faDoorOpen}/>
        </div>
        
    )
}