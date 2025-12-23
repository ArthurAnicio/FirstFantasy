"use client"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import styles from './PlayerArea.module.css'
import { PlayerCard } from "@/components/PlayerCard"
import { usePlayer } from "@/contexts/PlayerContext"
import { Place } from "@/components/Place"
import { PlayerInfo } from "@/components/PlayerInfo"

export default function Player(){
    
    const {
        takeDamage,
        useStamina,
        addXp,
        setXp,
        recover
    } = usePlayer()

    const router = useRouter()
    const [modalOn, setModalOn] = useState(false)

    useEffect(()=>{
        const auth = Cookies.get("carregado")
        if(auth!="sim"){
            router.push('/')
        }
    })

    return(
        <div className={styles.container}>
            <Place 
                image={"/images/places/coliseu.gif"} 
                name={"Coliseu"} 
                top={10}
                left={10}
                w={200} 
                h={200}
                centered
            />
            {modalOn&&<PlayerInfo close={()=>setModalOn(false)}/>}
            <PlayerCard openInfo={()=>setModalOn(true)}/>
        </div>
    )
}