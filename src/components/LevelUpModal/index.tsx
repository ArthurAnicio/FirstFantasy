import styles from './LevelUpModal.module.css'
import { usePlayer } from '@/contexts/PlayerContext'
import { leveling, LevelingRewards } from '@/functions/leveling'
import { Atribute } from '@/enums/atribute'
import { IconAtribute } from '@/functions/IconAtribute'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookBookmark, faChartSimple } from '@fortawesome/free-solid-svg-icons'

interface LevelUpModalProps{
    close: ()=>void
}

export function LevelUpModal({close}: LevelUpModalProps){

    const {maxHealth, maxStamina, level} = usePlayer()
    const rewards: LevelingRewards = leveling(level)

    return(
        <div className={styles.container}>
            <div className={styles.modal}>
                <h2>Nível {level} alcançado!</h2>
                <div className={styles.content}>
                    <h3>Recompensas:</h3>
                    <p style={{color:'var(--red-p)'}}> 
                        {maxHealth}
                        <IconAtribute atribute={Atribute.health} />
                    </p>
                    <p style={{color:'var(--orange-p)'}}>
                        {maxStamina}
                        <IconAtribute atribute={Atribute.stamina} /> 
                    </p>
                    <p style={{color:'var(--blue-s)'}}>
                        + {rewards.rewardTechnicalPoints} 
                        <FontAwesomeIcon icon={faBookBookmark} />
                    </p>
                    {rewards.rewardAtributePoints > 0 &&
                        <p style={{color:'var(--purple-p)'}}>
                            + {rewards.rewardAtributePoints}
                            <FontAwesomeIcon icon={faChartSimple} />
                        </p>
                    }
                    <button 
                        className={styles.confirm}
                        onClick={close}
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    )
}