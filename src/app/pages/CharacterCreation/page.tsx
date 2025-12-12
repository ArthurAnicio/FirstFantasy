'use client'
import styles from './CharacterCreation.module.css'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useGame } from '@/contexts/GameContext'
import Image from 'next/image'

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
    const [page,setPage] = useState(1)
    
    const [pName, setPName] = useState("")
    const [pCash, setPCash] = useState(20)
    const [pImage, setPImage] = useState("")
    const [pGender, setPGender] = useState("M")

    const [pStrength, setPStrength] = useState(1)
    const [pDexterity, setPDexterity] = useState(1)
    const [pConstitution, setPConstitution] = useState(1)
    const [pPresence, setPPresence] = useState(1)
    const [pMind, setPMind] = useState(1)

    const [pBonusDefence, setPBonusDefence] = useState(1)
    const [pBonusHealth, setPBonusHealth] = useState(1)
    const [pBonusStamina, setPBonusStamina] = useState(1)

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

    function setElements() {
        changeName?.(pName)
        changeCash?.(pCash)
        changeImage?.(pImage)
        changeGender?.(pGender)

        changeStat?.("strength", pStrength)
        changeStat?.("dexterity", pDexterity)
        changeStat?.("constitution", pConstitution)
        changeStat?.("mind", pMind)
        changeStat?.("presence", pPresence)

        defenseBonusUp?.(pBonusDefence)
        healthBonusUp?.(pBonusHealth)
        staminaBonusUp?.(pBonusStamina)
    }

    function createChar(){
        setElements()
        Cookies.set("criado","sim")
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
                    <div id={styles.div}>
                        <h1>Atributos</h1>
                    </div>
                )
            case 3:
                return(
                    <div id={styles.div}>
                        <h1>Ataques & Resistencias</h1>
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
                        -
                    </button>
                    <p>{page}</p>
                    <button onClick={()=>setPage(page+1)}>
                        +
                    </button>
                </div>
                <button className={styles.create} onClick={createChar}>Criar Personagem</button>
            </div>
        </div>
    )
}