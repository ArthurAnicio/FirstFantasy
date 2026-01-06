import styles from './PlayerInfo.module.css'
import { useState } from 'react'
import { usePlayer } from '@/contexts/PlayerContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faChartSimple, faScroll, faX, faMars, faVenus } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import { xpNeededForNextLevel, xpLevel } from '@/functions/xpFormulas'
import { DamageTypes } from '@/enums/damageTypes'
import { getDamageColor } from '@/functions/getDamageColor'
import { getDamageIcon } from '@/functions/getDamageIcon'

interface PlayerInfoProps{
 close:()=>void
}

export function PlayerInfo({close}:PlayerInfoProps){

    const [page,setPage] = useState(1)
    const {level, xp, image, name, gender, resistences, vulnerabilites, imunites} = usePlayer()

    function paginator(p:number){
        switch(p){
            case 1:
                return(
                    <div className={styles.profile} id={styles.div}>
                        <div className={styles.xp}>
                            <p> Level {level}</p>
                            <div className={styles.xpBar}>
                                <div style={{
                                    width: `${(xpLevel(xp)*100)/xpNeededForNextLevel(level)}%`,
                                    height: 10,
                                    background: 'var(--light-blue-s)',
                                }}>
                                </div>
                            </div>
                            <p> {level+1}</p>
                        </div>
                        <div className={styles.player}>
                            <nav>
                                <Image 
                                    className={styles.playerImage} 
                                    src={image} 
                                    alt={'Imagem do player'} 
                                    width={200} 
                                    height={200}
                                />
                            </nav>
                            <nav>
                                <p>Nome: {name}</p>
                                <p>
                                    Gênero: 
                                    {gender=='M'?<FontAwesomeIcon icon={faMars}/>:<FontAwesomeIcon icon={faVenus}/>}
                                </p>
                            </nav>
                        </div>
                        <div className={styles.dmgTypeInt}>
                            <p>Resistencias:</p>
                            {
                                resistences.length>0?
                                    resistences.map((damageType:DamageTypes,index:number) =>(
                                        <nav
                                            style={{
                                                color:"var(--black)",
                                                background: getDamageColor(damageType),
                                                fontSize:"28px",
                                                borderRadius:"50%",
                                                width:"35px",
                                                height: "35px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center"
                                            }} 
                                            key={index}
                                        >
                                            {getDamageIcon(damageType)}
                                        </nav>
                                    ))
                                : <p>Nenhuma</p>
                                                                              
                            }
                        </div>
                        <div className={styles.dmgTypeInt}>
                            <p>Vulnerabilidades:</p>
                            {
                                vulnerabilites.length>0?
                                    vulnerabilites.map((damageType:DamageTypes,index:number) =>(
                                        <nav
                                            style={{
                                                color:"var(--black)",
                                                background: getDamageColor(damageType),
                                                fontSize:"35px",
                                                borderRadius:"50%",
                                                width:"50px",
                                                height:"50px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center"
                                            }} 
                                            key={index}
                                        >
                                            {getDamageIcon(damageType)}
                                        </nav>
                                    ))
                                : <p>Nenhuma</p>
                                                                
                            }
                        </div>
                        <div className={styles.dmgTypeInt}>
                            <p>Imunidades:</p>
                            {
                                imunites.length>0?
                                    imunites.map((damageType:DamageTypes,index:number) =>(
                                        <nav
                                            style={{
                                                color:"var(--black)",
                                                background: getDamageColor(damageType),
                                                fontSize:"35px",
                                                borderRadius:"50%",
                                                width:"30px",
                                                height:"30px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center"
                                            }} 
                                            key={index}
                                        >
                                            {getDamageIcon(damageType)}
                                        </nav>
                                    ))
                                : <p>Nenhuma</p>
                                                                
                            }
                        </div>
                    </div>
                )
            case 2:
                return(
                    <div id={styles.div}>
                        Perfil
                    </div>
                )
            case 3:
                return(
                    <div id={styles.div}>
                        Perfil
                    </div>
                )
        }
    }

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
                    {paginator(page)}
                </div>
            </div>
        </div>
    )

}