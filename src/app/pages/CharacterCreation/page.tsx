'use client'
import styles from './CharacterCreation.module.css'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { use, useEffect, useState } from 'react'
import { useGame } from '@/contexts/GameContext'
import Image from 'next/image'
import { calcDefense, calcHealth, calcStamina } from '@/functions/calcStats'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faHandFist, 
    faWind, 
    faDumbbell, 
    faBrain, 
    faCommentDots, 
    faShield, 
    faHeart, 
    faBolt,
    faArrowLeft,
    faArrowRight
} from '@fortawesome/free-solid-svg-icons'
import { Atribute } from '@/enums/atribute'
import { defaultAttacks } from '../../../../public/itens/attacks/defaultAttacks'
import { AttackChoice } from '@/components/AttackChoice'

export default function CharacterCreation(){

    const { 
        name,
        gender,
        level,
        cash,
        image,
        strength,
        dexterity,
        constitution,
        presence,
        mind,
        bonusDefence,
        bonusHealth,
        bonusStamina,
        attacks,
        resistences,
        changeName,
        changeGender,
        changeCash,
        changeImage,
        changeStat,
        defenseBonusUp,
        healthBonusUp,
        staminaBonusUp,
    } = useGame()

    const router = useRouter()
    const [page,setPage] = useState(3)
    
    const [pName, setPName] = useState("")
    const [pCash, setPCash] = useState(20)
    const [pImage, setPImage] = useState("")
    const [pGender, setPGender] = useState("M")

    const [statsPoints, setStatsPoints] = useState(4)
    const [pStrength, setPStrength] = useState(1)
    const [pDexterity, setPDexterity] = useState(1)
    const [pConstitution, setPConstitution] = useState(1)
    const [pPresence, setPPresence] = useState(1)
    const [pMind, setPMind] = useState(1)


    const [pBonusDefence, setPBonusDefence] = useState(0)
    const [pBonusHealth, setPBonusHealth] = useState(0)
    const [pBonusStamina, setPBonusStamina] = useState(0)

    const [pDefense, setPDefense] = useState(calcDefense(pDexterity,pBonusDefence))
    const [pMaxHealth,setPMaxHealth] = useState(calcHealth(level,pConstitution,pBonusHealth))
    const [pMaxStamina, setPMaxStamina] = useState(calcStamina(level,pPresence,pConstitution,pBonusStamina))

    const [pAttacks, setPAttacks] = useState(attacks)
    const [pResistences, setPResistences] = useState(resistences)

    useEffect(()=>{
        const creating = Cookies.get("criando")
        if(creating!="sim"){
            router.push('/')
        }
    })

    useEffect(()=>{
        if(page<1){
            setPage(3)
        }
        if(page>3){
            setPage(1)
        }
    },[page])

    useEffect(()=>{
        setPDefense(calcDefense(pDexterity,pBonusDefence))
        setPMaxHealth(calcHealth(level,pConstitution,pBonusHealth))
        setPMaxStamina(calcStamina(level,pPresence,pConstitution,pBonusStamina))
    },[pConstitution,pPresence,pDexterity,pBonusDefence,pBonusHealth,pBonusStamina])

    function useStatsPoints(atribute:Atribute,amount:number){
        if(amount==1){
            if(statsPoints!=0){
                switch(atribute){
                    case Atribute.strength:
                        if(pStrength<3){
                            setPStrength(pStrength+1)
                            setStatsPoints(statsPoints-1)
                        }
                        break
                    case Atribute.dexterity:
                        if(pDexterity<3){
                            setPDexterity(pDexterity+1)
                            setStatsPoints(statsPoints-1)
                        }
                        break
                    case Atribute.constitution:
                        if(pConstitution<3){
                            setPConstitution(pConstitution+1)
                            setStatsPoints(statsPoints-1)
                        }
                        break
                    case Atribute.mind:
                        if(pMind<3){
                            setPMind(pMind+1)
                            setStatsPoints(statsPoints-1)
                        }
                        break
                    case Atribute.presence:
                        if(pPresence<3){
                            setPPresence(pPresence+1)
                            setStatsPoints(statsPoints-1)
                        }
                        break
                }
            }
        }else{
            if(statsPoints<=4){
               switch(atribute){
                    case Atribute.strength:
                        if(pStrength>0){
                            setPStrength(pStrength-1)
                            setStatsPoints(statsPoints+1)
                        }
                        break
                    case Atribute.dexterity:
                        if(pDexterity>0){
                            setPDexterity(pDexterity-1)
                            setStatsPoints(statsPoints+1)
                        }
                        break
                    case Atribute.constitution:
                        if(pConstitution>0){
                            setPConstitution(pConstitution-1)
                            setStatsPoints(statsPoints+1)
                        }
                        break
                    case Atribute.mind:
                        if(pMind>0){
                            setPMind(pMind-1)
                            setStatsPoints(statsPoints+1)
                        }
                        break
                    case Atribute.presence:
                        if(pPresence>0){
                            setPPresence(pPresence-1)
                            setStatsPoints(statsPoints+1)
                        }
                        break
                } 
            }
        }
    }

    function setElements() {
        changeName?.(pName)
        changeCash?.(pCash)
        changeImage?.(pImage)
        changeGender?.(pGender)

        changeStat?.(Atribute.strength, pStrength)
        changeStat?.(Atribute.dexterity, pDexterity)
        changeStat?.(Atribute.constitution, pConstitution)
        changeStat?.(Atribute.mind, pMind)
        changeStat?.(Atribute.presence, pPresence)

        defenseBonusUp?.(pBonusDefence)
        healthBonusUp?.(pBonusHealth)
        staminaBonusUp?.(pBonusStamina)
    }

    function createChar(){
        setElements()
        Cookies.set("carregado","sim")
        Cookies.set("criando","")
        router.push("/pages/PlayerArea")
    }

    function renderPages(p:number){
        switch(p){
            case 1:
                return(
                    <div id={styles.div} className={styles.basicInfo}>
                        <h1>Informações Básicas</h1>
                        <div className={styles.infos}>
                            <nav className={styles.info}>
                                <label>Nome:</label>
                                <input type="text" value={pName} onChange={(e)=>setPName(e.target.value)} />
                            </nav>
                            <nav className={styles.info}>
                                <label>Gênero:</label>
                                <div 
                                    className={styles.maleGender}
                                    id={pGender=="M"?styles.selected:""}
                                    onClick={()=>setPGender("M")}
                                >
                                    M
                                </div>
                                <div 
                                    className={styles.femaleGender}
                                    id={pGender=="F"?styles.selected:""}
                                    onClick={()=>setPGender("F")}
                                >
                                    F
                                </div>
                            </nav>
                            <nav className={styles.info}>
                                <label>Imagem:</label>
                                <input type="url" placeholder='Url da imagem' value={pImage} onChange={(e)=>setPImage(e.target.value)}/>
                            </nav>
                            <nav className={styles.info}>
                                <label>Level:</label>
                                <p>{level}</p>
                            </nav>
                            <Image className={styles.imageChar} src={pImage!=""?pImage:'/images/profileDefault.png'} alt='Foto do personagem' width={400} height={400}/>
                        </div>
                    </div>
                )
            case 2:
                return(
                    <div className={styles.statsPage} id={styles.div}>
                        <h1>Atributos</h1>
                        <div className={styles.statsContent}>
                            <div className={styles.atributes}>
                                <p className={styles.labelPoints}>Pontos: {statsPoints}</p>
                                <nav>
                                    
                                    <label>
                                        <FontAwesomeIcon className={styles.icon} icon={faHandFist} />
                                        Força:
                                    </label>
                                    <div className={styles.atribute}>
                                        <button onClick={()=>useStatsPoints(Atribute.strength,0)}>
                                            -
                                        </button>
                                        <p>{pStrength}</p>
                                        <button onClick={()=>useStatsPoints(Atribute.strength,1)}>
                                            +
                                        </button>
                                    </div>
                                </nav>
                                <nav>
                                    <label>
                                        <FontAwesomeIcon className={styles.icon} icon={faWind} />
                                        Destreza:
                                    </label>
                                    <div className={styles.atribute}>
                                        <button onClick={()=>useStatsPoints(Atribute.dexterity,0)}>
                                            -
                                        </button>
                                        <p>{pDexterity}</p>
                                        <button onClick={()=>useStatsPoints(Atribute.dexterity,1)}>
                                            +
                                        </button>
                                    </div>
                                </nav>
                                <nav>
                                    <label>
                                        <FontAwesomeIcon className={styles.icon} icon={faDumbbell} />
                                        Constituição:
                                    </label>
                                    <div className={styles.atribute}>
                                        <button onClick={()=>useStatsPoints(Atribute.constitution,0)}>
                                            -
                                        </button>
                                        <p>{pConstitution}</p>
                                        <button onClick={()=>useStatsPoints(Atribute.constitution,1)}>
                                            +
                                        </button>
                                    </div>
                                </nav>
                                <nav>
                                    <label>
                                        <FontAwesomeIcon className={styles.icon} icon={faBrain} />
                                        Mente:
                                    </label>
                                    <div className={styles.atribute}>
                                        <button onClick={()=>useStatsPoints(Atribute.mind,0)}>
                                            -
                                        </button>
                                        <p>{pMind}</p>
                                        <button onClick={()=>useStatsPoints(Atribute.mind,1)}>
                                            +
                                        </button>
                                    </div>
                                </nav>
                                <nav>
                                    <label>
                                        <FontAwesomeIcon className={styles.icon}  icon={faCommentDots} />
                                        Presença:
                                    </label>
                                    <div className={styles.atribute}>
                                        <button onClick={()=>useStatsPoints(Atribute.presence,0)}>
                                            -
                                        </button>
                                        <p>{pPresence}</p>
                                        <button onClick={()=>useStatsPoints(Atribute.presence,1)}>
                                            +
                                        </button>
                                    </div>
                                </nav>
                            </div>
                            <div className={styles.statsInfo}>
                                <p>Status:</p>
                                <nav
                                        style={{
                                            color: "var(--green-s)"
                                        }}
                                >
                                    <label >
                                        <FontAwesomeIcon className={styles.icon} icon={faHeart} />
                                        Vida:
                                    </label>
                                    <p>{pMaxHealth}</p>
                                </nav>
                                <nav
                                    style={{
                                            color: "var(--orange-s)"
                                        }}
                                >
                                    <label>
                                        <FontAwesomeIcon className={styles.icon} icon={faBolt} />
                                        Stamina:
                                    </label>
                                    <p>{pMaxStamina}</p>
                                </nav>
                                <nav
                                    style={{
                                            color: "var(--gray-s)"
                                        }}
                                >
                                    <label>
                                        <FontAwesomeIcon className={styles.icon} icon={faShield} />
                                        Defesa:
                                    </label>
                                    <p>{pDefense}</p>
                                </nav>
                            </div>
                        </div>
                    </div>
                )
            case 3:
                return(
                    <div id={styles.div}>
                        <h1>Ataques & Habilidades</h1>
                        <AttackChoice attack={defaultAttacks[0]} price={30}/>
                    </div>
                )
            default:
                return(
                    <div id={styles.div}>
                        <h1>Carregando</h1>
                    </div>
                )
        }
    }

    return(
        <div className={styles.container}>
            <div className={styles.pages}>
            {renderPages(page)}
            </div>
            <div className={styles.outPages}>
                <div className={styles.paginator}>
                    <button onClick={()=>setPage(page-1)}>
                        <FontAwesomeIcon icon={faArrowLeft}/>
                    </button>
                    <p>{page}</p>
                    <button onClick={()=>setPage(page+1)}>
                        <FontAwesomeIcon icon={faArrowRight}/>
                    </button>
                </div>
                <button className={styles.create} onClick={createChar}>Criar Personagem</button>
            </div>
        </div>
    )
}