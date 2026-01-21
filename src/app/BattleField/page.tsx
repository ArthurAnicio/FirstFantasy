/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import styles from './BattleField.module.css'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useMusic } from '@/contexts/MusicContext'
import { useSound } from '@/contexts/SoundContext'
import { usePlayer } from '@/contexts/PlayerContext'
import { useBattle } from '@/contexts/BattleContext'
import Image from 'next/image'
import { Character } from '@/interfaces/character'
import { PlayerCard } from '@/components/PlayerCard'
import { AttackItem } from '@/components/AttackItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPersonRunning, faFlask,faScroll, faBriefcaseMedical, faAlarmClock, faHeart, faBolt, faCoins} from '@fortawesome/free-solid-svg-icons'
import { Challengers } from '@/contexts/BattleContext'
import { getDamageColor } from '@/functions/getDamageColor'
import { getDamageIcon } from '@/functions/getDamageIcon'
import { useRouter } from 'next/navigation'

enum Actions{
    attack,
    recover,
    none
}

export default function BattleField() {

    const router = useRouter()
    const {
        equipedAttacks, 
        maxHealth, 
        maxStamina, 
        name, 
        recover,
        changeActualHealth,
        changeActualStamina,
        changeCash,
        cash,
        addXp
    } = usePlayer()
    const { playMusic } = useMusic()
    const {} = useSound()
    const {
        enemyHealth, 
        enemyStamina, 
        getEnemy,  
        whoseTurn, 
        startBattle, 
        enemyAttack,
        usedAttack,
        changeTurn,
        resetBattle,
        winner,
        enemyReady
    } = useBattle()
    const [quantHp, setQuantHp] = useState(2)
    const [quantSta,setQuantSta] = useState(2)
    const track = Cookies.get('battleTrack') || ''
    const backgroundImage = Cookies.get('battleField')||''
    const challenger: Character = JSON.parse(Cookies.get('challenger')||'{}')
    const [attacked, setAttacked] = useState(false)
    const [colorTurn, setColorTurn] = useState('')
    const [wichAction, setWichAction] = useState(Actions.none)
    const [lost, setLost] = useState(false)
    const [win, setWin] = useState(false)
    

    useEffect(()=>{
        playMusic(track)
        getEnemy(challenger)
        setTimeout(()=>{startBattle()},3000)
    },[])

    useEffect(()=>{
        console.log("Inimigo tá pronto? ",enemyReady)
        if(enemyReady){setTimeout(()=>{
            if(winner==Challengers.player){
                setWin(true)
            }else if(winner==Challengers.enemy){
                setLost(true)
            }
        },2000)}
    },[winner, enemyReady])

    useEffect(()=>{
        if(whoseTurn == Challengers.enemy){
            setColorTurn('var(--red-p)')
            enemyAttack()
        }else{
            setColorTurn('var(--blue-t)')
        }
    },[whoseTurn])

    useEffect(()=>{
        setAttacked(true)
        setTimeout(()=>{setAttacked(false)},1500)
    },[usedAttack])

    function skipTurn(){
        setWichAction(Actions.none)
        changeTurn()
    }

    function heal(stamina=false){
        if(stamina){
            if(quantSta>0){
                recover!('',Math.floor(maxStamina/2))
                setQuantSta(quantSta-1)
                setWichAction(Actions.none)
                changeTurn()
            }
        }else{
            if(quantHp>0){
                recover!('health',Math.floor(maxHealth/2))
                setQuantHp(quantHp-1)
                setWichAction(Actions.none)
                changeTurn()
            }
        }
    }

    function losted() {
        changeActualHealth!(1)
        changeActualStamina!(0)
        const lCash = cash! - 10
        if(lCash<0){
            changeCash!(0)
        }else{
            changeCash!(lCash)
        }
        resetBattle()
        router.push('/City')
    }

    function winned(){
        addXp!(challenger.xp)
        changeCash!(cash!+(challenger.level*10))
        resetBattle()
        router.push('/City')
    }

    return(
        <div
            className={styles.container} 
            style={{
                backgroundImage
                : `url(/images/backgrounds/${backgroundImage}.jpg), linear-gradient(#00000080, #00000080)`,
            }}
        >
            <div 
                className={styles.win}
                style={{
                    opacity: win?1:0,
                    zIndex: win?8:-1
                }}
            >
                <h2>Você Ganhou!</h2>
                
                <p>+{challenger.xp} xp</p>
                <p>+{challenger.level*10}<FontAwesomeIcon icon={faCoins}/></p>

                <div onClick={winned}>Voltar</div>
            </div>
            <div 
                className={styles.lost} 
                style={{
                    opacity: lost?1:0,
                    zIndex: lost?8:-1
                }}
            >
                <h2>Você Perdeu!</h2>
                
                <p>1<FontAwesomeIcon icon={faHeart}/></p>
                <p>0<FontAwesomeIcon icon={faBolt}/></p>
                <p>-10<FontAwesomeIcon icon={faCoins}/></p>

                <div onClick={losted}>Voltar</div>
            </div>
           { whoseTurn != Challengers.none && <div 
                className={styles.whoseTurn} 
                style={{
                    borderBottom: `solid 5px ${colorTurn}`,
                    color: colorTurn
                }}
            >
                Turno de {whoseTurn == Challengers.enemy? challenger.name : name}
            </div>}
            <PlayerCard/>
            <div className={styles.enemyCard}>
                <div className={styles.enemy}>
                    <div className={styles.enemyLevel}>
                        {challenger.level}
                    </div>
                    <Image
                        className={styles.enemyImage}
                        src={challenger.image}
                        alt={challenger.name}
                        width={130}
                        height={130}
                    />
                </div>
                <div className={styles.enemyStats}>
                    <div
                        className={styles.statBar}
                    >
                        <p className={styles.statNum}>
                            {enemyHealth}/{challenger.maxHealth}
                        </p>
                        <div
                            style={{
                                height:'100%',
                                width: `${((enemyHealth*100)/challenger.maxHealth)}%`,
                                background: 'linear-gradient(var(--red-p), var(--red-t))',
                                transition: '.8s'
                            }}
                        />
                    </div>
                    <div 
                        className={styles.statBar}
                    >
                        <p className={styles.statNum}>
                            {enemyStamina}/{challenger.maxStamina}
                        </p>
                        <div
                            style={{
                                height:'100%',
                                width: `${((enemyStamina*100)/challenger.maxStamina)}%`,
                                background: 'linear-gradient(var(--orange-p), var(--orange-t))',
                                transition: '.8s'
                            }}
                        />
                    </div>
                </div>
            </div>
            {   usedAttack.attack.name != '' &&
                <div 
                    className={styles.attackInfo}
                    style={{
                        opacity: attacked?1:0,
                        bottom: attacked?250:210
                    }}
                >
                    <p>{usedAttack.owner} usou {usedAttack.attack.name}</p>
                    <p>Ataque: {usedAttack.ressult.result}</p>
                    { usedAttack.ressult.failure?
                        <p>
                            Errou!
                        </p>
                        :
                        <p style={{color:getDamageColor(usedAttack.attack.damageType)}}>
                            Dano: {usedAttack.ressult.critical&& 'Críico'} {usedAttack.ressult.damage} {getDamageIcon(usedAttack.attack.damageType)}
                        </p>
                    }
                </div>
            }
            <div 
                className={styles.skipTurn} 
                onClick={skipTurn}
                style={{
                    opacity: whoseTurn==Challengers.player? 1 : 0
                }}
            >
                <FontAwesomeIcon icon={faPersonRunning}/>
                Passar turno
            </div>
            <div 
                className={styles.utils} 
                id={wichAction==Actions.recover?styles.utilsS:''}
                onClick={()=>setWichAction(Actions.recover)}
                style={{
                    opacity: whoseTurn==Challengers.player? 1 : 0,
                    bottom: whoseTurn==Challengers.player? 210 : 180,
                    left: whoseTurn==Challengers.player? 15 : 200
                }}
            >
                <FontAwesomeIcon icon={faFlask}/>
                Recuperar
            </div>
            <div 
                className={styles.attacksButton} 
                id={wichAction==Actions.attack?styles.attacksButtonS:''}
                onClick={()=>setWichAction(Actions.attack)}
                style={{
                    opacity: whoseTurn==Challengers.player? 1 : 0,
                    bottom: whoseTurn==Challengers.player? 240 : 180
                }}
            >
                <FontAwesomeIcon icon={faScroll}/>
                Ataques
            </div>
            <div 
                className={styles.recoverCon}
                style={{
                    width: wichAction == Actions.recover?440:0,
                    opacity: wichAction == Actions.recover?1:0
                }}
            >
                <div
                    className={styles.recoverItem}
                    onClick={()=>heal()}
                    style={{
                        background: quantHp==0?'linear-gradient(var(--gray-s),var(--gray-p))':'linear-gradient(var(--red-p), var(--red-t))',
                        cursor: quantHp!=0?'pointer':'not-allowed'
                    }}
                >
                    <FontAwesomeIcon className={styles.recoverIcon} icon={faBriefcaseMedical}/>
                    <p className={styles.recoverInfo}>
                        Recupera metade da vida || x{quantHp} 
                    </p>
                </div>
                <div
                    className={styles.recoverItem}
                    onClick={()=>heal(true)}
                    style={{
                        background: quantSta==0?'linear-gradient(var(--gray-s),var(--gray-p))':'linear-gradient(var(--orange-p), var(--orange-t))',
                        cursor: quantSta!=0?'pointer':'not-allowed'
                    }}
                >
                    <FontAwesomeIcon className={styles.recoverIcon} icon={faAlarmClock}/>
                    <p className={styles.recoverInfo}>
                        Recupera metade da stamina || x{quantSta} 
                    </p>
                </div>
            </div>
            <div 
                className={styles.attacksCon}
                style={{
                    width: wichAction == Actions.attack?440:0,
                    opacity: wichAction == Actions.attack?1:0,
                    bottom: wichAction == Actions.attack?50:500
                }}
            >
                {equipedAttacks.map(atk=>
                    <AttackItem key={atk.id} attack={atk} inBattle={true} changeAction={()=>setWichAction(Actions.none)}/>
                )}
            </div>
        </div>
    )
}