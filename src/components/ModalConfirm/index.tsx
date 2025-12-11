import styles from "./ModalConfirm.module.css"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { url } from "inspector"

interface ModalConfirmProps{
    url:string
    cancel:()=>void
}

export function ModalConfirm(props:ModalConfirmProps){

    const router = useRouter()
    function confirm(){
        Cookies.set("criando","sim")
        router.push(props.url)
    }

    return(
        <div className={styles.modal}>
            <h1>Tem certeza?</h1>
            <p>(Seu progresso será excluído)</p>
            <div className={styles.buttons}>
                <button onClick={props.cancel} className={styles.back}>Voltar</button>
                <button onClick={confirm} className={styles.confirm}>Sim</button>
            </div>
        </div>
    )
}