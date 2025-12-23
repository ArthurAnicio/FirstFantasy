import styles from './PlayerInfo.module.css'
import { useState } from 'react'
import { usePlayer } from '@/contexts/PlayerContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faChartSimple, faScroll, faX } from '@fortawesome/free-solid-svg-icons' 

interface PlayerInfoProps{
 close:()=>void
}

export function PlayerInfo({close}:PlayerInfoProps){

    const [page,setPage] = useState(1)

    return(
        <div className={styles.container}>
            <div className={styles.cardInfo}>
                <div className={styles.options}>
                    <div 
                        className={styles.option}
                        id={page==1?styles.selected:''}
                        onClick={()=>setPage(1)}
                    >
                        <FontAwesomeIcon icon={faUser}/>
                    </div>
                    <div 
                        className={styles.option}
                        id={page==2?styles.selected:''}
                        onClick={()=>setPage(2)}
                    >
                        <FontAwesomeIcon icon={faChartSimple}/>
                    </div>
                    <div 
                        className={styles.option}
                        id={page==3?styles.selected:''}
                        onClick={()=>setPage(3)}
                    >
                        <FontAwesomeIcon icon={faScroll}/>
                    </div>
                </div>
                <div className={styles.header}>
                    {
                        page==1?
                            <p>Personagem</p>
                        :
                        page==2?    
                            <p>Status</p>
                        :
                            <p>Habilidades</p>
                    }
                    <div className={styles.close} onClick={close}>
                        <FontAwesomeIcon icon={faX}/>
                    </div>
                </div>
                <div className={styles.content}>

                </div>
            </div>
        </div>
    )

}