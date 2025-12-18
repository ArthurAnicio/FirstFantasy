"use client"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import styles from './PlayerArea.module.css'
import { PlayerCard } from "@/components/PlayerCard"
import { useGame } from "@/contexts/GameContext"
import { DamageTypes } from "@/enums/damageTypes"

export default function Player(){
    
    const {
        takeDamage,
        useStamina,
        addXp,
        setXp,
        recover
    } = useGame()

    const router = useRouter()

    useEffect(()=>{
        const auth = Cookies.get("carregado")
        if(auth!="sim"){
            router.push('/')
        }
    })

    return(
        <div className={styles.container}>
            PlayerArea
            <button
                onClick={()=>takeDamage(2,DamageTypes.fire)}
            >
                dano
            </button>
            <button
                onClick={()=>recover("health",1)}
            >
                cura
            </button>
            <button
                onClick={()=>useStamina(1)}
            >
                usa stamina
            </button>
            <button
                onClick={()=>recover("",1)}
            >
                recupera stamina
            </button>
            <button
                onClick={()=>addXp(20)}
            >
                ganha xp
            </button>
            <button
                onClick={()=>setXp(0)}
            >
                resetaXp
            </button>
            <PlayerCard/>
        </div>
    )
}