'use client'
import styles from './CharacterCreation.module.css'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useGame } from '@/contexts/GameContext'
import Image from 'next/image'
import { calcDefense, calcHealth, calcStamina } from '@/functions/calcStats'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faMars,
    faVenus,
    faCoins
} from '@fortawesome/free-solid-svg-icons'
import { Atribute } from '@/enums/atribute'
import { starterAttacks } from '../../../../public/objects/attacks/starterAttacks'
import { FirstAttackChoice } from '@/components/FirstAttackChoice'
import { IconAtribute } from '@/functions/IconAtribute'
import { AttackItem } from '@/components/AttackItem'
import { defaultAttacks } from '../../../../public/objects/attacks/defaultAttacks'
import { getBiggestAtribute } from '@/functions/getBiggestAtribute'
import { EmptyAttackItem } from '@/components/EmptyAttackItem'
import { passivesPlayer } from '../../../../public/objects/passives/passivesPlayer'
import { PassiveItem } from '@/components/PassiveItem'
import { BonusTypes } from '@/enums/bonusTypes'
import { DamageTypes } from '@/enums/damageTypes'
import { getDamageIcon } from '@/functions/getDamageIcon'
import { getDamageColor } from '@/functions/getDamageColor'
import { Attack } from '@/interfaces/attack'
import { Passives } from '@/interfaces/passives'

export default function CharacterCreation(){

    const {
        level,
        changeName,
        changeGender,
        changeCash,
        changeImage,
        changeStat,
        bonusAttackUp,
        defenseBonusUp,
        healthBonusUp,
        staminaBonusUp,
        addAttack,
        equipAttack,
        addPassive,
        addResistence,
        addImunite,
        addVulnerabilite
    } = useGame()

    const router = useRouter()
    const [page,setPage] = useState(1)
    const [selectedAttackId,setSelectedAttackId] = useState('')
    const [canCreate,setCanCreate] = useState(false)
    
    const [pName, setPName] = useState("")
    const [pCash, setPCash] = useState(20)
    const [pImage, setPImage] = useState("/images/playerPic/defaultMale")
    const [pGender, setPGender] = useState("M")

    const [statsPoints, setStatsPoints] = useState(4)
    const [pStrength, setPStrength] = useState(1)
    const [pDexterity, setPDexterity] = useState(1)
    const [pConstitution, setPConstitution] = useState(1)
    const [pPresence, setPPresence] = useState(1)
    const [pMind, setPMind] = useState(1)

    const [pBonusAttack, setPBonusAttack] = useState(0)
    const [pBonusDefence, setPBonusDefence] = useState(0)
    const [pBonusHealth, setPBonusHealth] = useState(0)
    const [pBonusStamina, setPBonusStamina] = useState(0)

    const [pDefense, setPDefense] = useState(calcDefense(pDexterity,pBonusDefence))
    const [pMaxHealth,setPMaxHealth] = useState(calcHealth(level,pConstitution,pBonusHealth))
    const [pMaxStamina, setPMaxStamina] = useState(calcStamina(level,pPresence,pConstitution,pBonusStamina))

    const [pEquipedAttacks, setPEquippedAttacks] = useState<Attack[]>([])
    const [pAttacks, setPAttacks] = useState<Attack[]>([])
    const [pPassives, setPPassives] = useState<Passives[]>([])
    const [pResistences, setPResistences] = useState<DamageTypes[]>([])
    const [pVulnerabilites, setPVulnerabilites] = useState<DamageTypes[]>([])
    const [pImunites, setPImunites] = useState<DamageTypes[]>([])

    useEffect(()=>{
        Cookies.set("carregado","")
    },[])

    useEffect(()=>{
        const creating = Cookies.get("criando")
        if(creating!="sim"){
            router.push('/')
        }else{
            Cookies.set("player","")
        }
        
    },[])

    useEffect(()=>{

        if(pName!="" && statsPoints==0 && selectedAttackId){
            setCanCreate(true)
        }else{
            setCanCreate(false)
        }
    },[
        pName,
        statsPoints,
        selectedAttackId
    ])


    useEffect(()=>{
        if(pGender=="M"){
            setPImage('/images/playerPic/defaultMale.png')
        }else{
            setPImage('/images/playerPic/defaultFemale.png')
        }
    },[pGender])

    useEffect(() => {
        const bestAttr = getBiggestAtribute(
            pStrength,
            pDexterity,
            pConstitution,
            pMind,
            pPresence
        )

        const atk = defaultAttacks.find(atk => atk.atribute === bestAttr)
        if (!atk) return

        setPAttacks(prev => {
            const withoutDefaults = prev.filter(a =>
            !defaultAttacks.some(d => d.id === a.id)
            );
            if (withoutDefaults.some(a => a.id === atk.id)) return prev
            return [...withoutDefaults, atk]
        });

        setPEquippedAttacks(prev => {
            const withoutDefaults = prev.filter(a =>
            !defaultAttacks.some(d => d.id === a.id)
            );
            if (withoutDefaults.some(a => a.id === atk.id)) return prev
            return [...withoutDefaults, atk]
        })
    }, [pStrength, pDexterity, pConstitution, pMind, pPresence])

    useEffect(()=>{
        setPDefense(calcDefense(pDexterity,pBonusDefence))
        setPMaxHealth(calcHealth(level,pConstitution,pBonusHealth))
        setPMaxStamina(calcStamina(level,pPresence,pConstitution,pBonusStamina))
    },[pConstitution,pPresence,pDexterity,pBonusDefence,pBonusHealth,pBonusStamina,level])

    useEffect(() => {
        const attack = starterAttacks.find(atk => atk.id == selectedAttackId);
        if (!attack) return;

        setPEquippedAttacks(prev => {
            const fixed = prev.filter(
            atk => !starterAttacks.some(satk => satk.id == atk.id)
            );

            return [...fixed, attack];
        });

        setPAttacks(prev => {
            const fixed = prev.filter(
            atk => !starterAttacks.some(satk => satk.id == atk.id)
            );
            return [...fixed, attack];
        });
    }, [selectedAttackId]);

    function buyPassive(passiveId:string,newCash:number){
        const passive = passivesPlayer.find(pas=>pas.id==passiveId)
        if(!passive)return
        setPPassives(prev => [...prev,passive])
        setPCash(newCash)
        aplicatePassive(passiveId)
    }

    function aplicatePassive(id:string){
        const passive = passivesPlayer.find(pas=>pas.id==id)
        if(!passive)return
        switch(passive.typeBonus){
            case BonusTypes.bonusAttack:
                setPBonusAttack(passive.bonusNum)
                break
            case BonusTypes.bonusCriticalDamage:
                pAttacks.forEach(atk => {
                    atk.criticalBonus += passive.bonusNum
                });
                break            
            case BonusTypes.bonusCriticalRatio:
                pAttacks.forEach(atk => {
                    atk.criticalRatio -= passive.bonusNum
                });
                break
            case BonusTypes.bonusDefense:
                setPBonusDefence(passive.bonusNum)
                break
            case BonusTypes.bonusHp:
                setPBonusHealth(passive.bonusNum)
                break
            case BonusTypes.bonusStamina:
               setPBonusStamina(passive.bonusNum)
               break
            case BonusTypes.resistence:
               setPResistences([...pResistences,passive.bonusDamageType])
               break
            case BonusTypes.vulnerabilite:
               setPVulnerabilites([...pVulnerabilites,passive.bonusDamageType])
               break
            case BonusTypes.imunite:
               setPImunites([...pImunites,passive.bonusDamageType])
               break
            case BonusTypes.bonusStat:
               switch(passive.bonusStat){
                case Atribute.constitution:
                    setPConstitution(pConstitution+1)
                    break
                case Atribute.strength:
                    setPStrength(pStrength+1)
                    break
                case Atribute.dexterity:
                    setPDexterity(pDexterity+1)
                    break
                case Atribute.mind:
                    setPMind(pMind+1)
                    break
                case Atribute.presence:
                    setPPresence(pPresence+1)
                    break
               }
        }
    }

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

        bonusAttackUp?.(pBonusAttack)
        defenseBonusUp?.(pBonusDefence)
        healthBonusUp?.(pBonusHealth)
        staminaBonusUp?.(pBonusStamina)

        pAttacks.forEach(atk => {
            addAttack?.(atk)
        })
        pEquipedAttacks.forEach(atk => {
            equipAttack?.(atk)
        })
        pPassives.forEach(pas => {
            addPassive?.(pas)
        })
        pResistences.forEach(res => {
            addResistence?.(res)
        })
        pImunites.forEach(imu => {
            addImunite?.(imu)
        })
        pVulnerabilites.forEach(vul => {
            addVulnerabilite?.(vul)
        })
    }

    function createChar(){
        if (!canCreate) return

        setElements()

        setTimeout(() => {
            Cookies.set("carregado","sim")
            Cookies.set("criando","")
            router.push("/pages/PlayerArea")
        }, 0)
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
                                    <FontAwesomeIcon icon={faMars}/>
                                </div>
                                <div 
                                    className={styles.femaleGender}
                                    id={pGender=="F"?styles.selected:""}
                                    onClick={()=>setPGender("F")}
                                >
                                    <FontAwesomeIcon icon={faVenus}/>
                                </div>
                            </nav>
                            <nav className={styles.info}>
                                <label>Level:</label>
                                <p>{level}</p>
                            </nav>
                            <Image className={styles.imageChar} src={pImage} alt='Foto do personagem' width={400} height={400}/>
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
                                        <IconAtribute atribute={Atribute.strength}/>
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
                                        <IconAtribute atribute={Atribute.dexterity}/>
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
                                        <IconAtribute atribute={Atribute.constitution}/>
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
                                        <IconAtribute atribute={Atribute.mind}/>
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
                                        <IconAtribute atribute={Atribute.presence}/>
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
                                        <IconAtribute atribute={Atribute.health}/>
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
                                        <IconAtribute atribute={Atribute.stamina}/>
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
                                        <IconAtribute atribute={Atribute.defense}/>
                                        Defesa:
                                    </label>
                                    <p>{pDefense}</p>
                                </nav>
                            </div>
                        </div>
                        <div className={styles.defencesContent}>
                            <div>
                                Resistencias:
                                {pResistences.length>0?
                                    pResistences.map((damageType:DamageTypes,index:number) =>(
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
                            <div>
                                Vulnerabilidades:
                                {pVulnerabilites.length>0?
                                    pVulnerabilites.map((damageType:DamageTypes,index:number) =>(
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
                            <div>
                                Imunidades:
                                {pImunites.length>0?
                                    pImunites.map((damageType:DamageTypes,index:number) =>(
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
                        </div>
                    </div>
                )
            case 3:
                return(
                    <div className={styles.skillsPage} id={styles.div}>
                        <h1>Ataques & Habilidades</h1>
                        <div className={styles.attacksArea}>
                            <p>Ataques Equipados</p>
                            <div className={styles.equipedAttacks}>
                                {pEquipedAttacks.map((attack)=>(
                                    <AttackItem key={attack.id} attack={attack} inBattle={false} />
                                ))}
                                {Array.from({ length: Math.max(0, 6 - pEquipedAttacks.length) }).map((_, i) => (
                                    <EmptyAttackItem key={`empty-${i}`} />
                                ))}
                            </div>
                            <p>Escolha um ataque inicial:</p>    
                            <div className={styles.starterAttaks}>
                                {starterAttacks
                                .map((attack)=>(
                                    <FirstAttackChoice 
                                        key={attack.id}
                                        attack={attack}
                                        selected={selectedAttackId == attack.id} 
                                        onClick={setSelectedAttackId}                                
                                    />
                                ))} 
                            </div>    
                        </div>
                        <div className={styles.passivesArea}>
                            <p>Habilidades Treinadas</p>
                            <div className={styles.passivesList}>
                                {pPassives.length > 0 ? 
                                    pPassives.map((passive)=>(
                                        <PassiveItem key={passive.id} passive={passive} buy={buyPassive}/>
                                    ))
                                    : <p>Nenhuma habilidade treinada.</p>
                                }
                            </div>
                            <div className={styles.passivesShop}>
                                <h3>
                                    Loja de Habilidades
                                    <div>
                                        <FontAwesomeIcon icon={faCoins}/>
                                        <span>{pCash}</span>
                                    </div>
                                </h3>
                                <div className={styles.passivesToBuy}>
                                    {passivesPlayer.filter(pas => !(pPassives.includes(pas))).map((passive)=>(
                                        <PassiveItem 
                                            key={passive.id} 
                                            passive={passive}
                                            buy={buyPassive}
                                            shop={true}
                                            actualCash={pCash}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>                    
                    </div>
                )
            default:
                return(
                    <div id={styles.div}>
                        <h1>Carregando...</h1>
                    </div>
                )
        }
    }

    return(
        <div className={styles.container}>
            <div className={styles.pages}>
                <div className={styles.options}>
                    <div 
                        className={styles.option}
                        id={page==1?styles.optionSelected:""}
                        onClick={()=>setPage(1)}
                    >
                        Info
                    </div>
                    <div 
                        className={styles.option}
                        id={page==2?styles.optionSelected:""}
                        onClick={()=>setPage(2)}
                    >
                        Atributos
                    </div>
                    <div 
                        className={styles.option}
                        id={page==3?styles.optionSelected:""}
                        onClick={()=>setPage(3)}
                    >
                        Habilidades
                    </div>
                </div>
            {renderPages(page)}
            </div>
            <button 
                className={styles.create}
                id={canCreate?"":styles.createDesabled}
                onClick={createChar}
            >
                Criar Personagem
            </button>
        </div>
    )
}