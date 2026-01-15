import { Atribute } from '@/enums/atribute'
import styles from './Tratament.module.css'
import { usePlayer } from '@/contexts/PlayerContext'
import { IconAtribute } from '@/functions/IconAtribute'
import { useSound } from '@/contexts/SoundContext'

interface TratamentProps{
    title: string
    desc: string
    price:number
    health: number
    stamina: number
}

export function Tratament({ title, desc ,price ,health ,stamina }:TratamentProps){

    const { recover, cash, changeCash } = usePlayer()
    const { play } = useSound()

    function treat(){
        if(price<=cash!){
            play('Buy.mp3')
            setTimeout(() => {
                recover!('health', health)
                recover!('',stamina)
                changeCash!(cash!-price)
            }, 200);
        }
    }

    return(
        <div 
            className={styles.tratament}
            onClick={()=>treat()}
        >
            <h2 className={styles.title}>
                {title}
            </h2>
            <label className={styles.desc}>
                {desc}
            </label>
            <p className={styles.health} style={{color:'var(--red-p)'}}>
                <IconAtribute atribute={Atribute.health}/>
                {health}
            </p>
            <p className={styles.stamina} style={{color:'var(--orange-p)'}}>
                <IconAtribute atribute={Atribute.stamina}/>
                {stamina}
            </p>
            <label 
                className={styles.price}
                style={{
                    color:cash!>=price?'var(--green-p)':'var(--red-p)'
                }}
            >
                ${price}
            </label>
        </div>
    )
}