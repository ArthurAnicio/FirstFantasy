"use client"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Player(){
    
    const router = useRouter()

    useEffect(()=>{
        const auth = Cookies.get("carregado")
        if(auth!="sim"){
            router.push('/')
        }
    })

    return(
        <div>PlayerArea</div>
    )
}