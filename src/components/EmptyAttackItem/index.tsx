import styles from './EmptyAttaclItem.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'

export function EmptyAttackItem() {
    return (
        <div className={styles.card}>
            <FontAwesomeIcon icon={faCirclePlus} className={styles.icon} />
        </div>
    )
}