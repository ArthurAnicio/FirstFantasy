import styles from './Leave.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/navigation'
import { useSound } from '@/contexts/SoundContext'

export function Leave(){

    const router = useRouter()
    const { play } = useSound();

    function leave(){
        play('Leave.mp3')
        setTimeout(() => {
            router.push('/City')
        }, 300);
    }

    return(
        
        <div className={styles.leave} onClick={leave}>
            <FontAwesomeIcon icon={faDoorOpen}/>
        </div>
        
    )
}