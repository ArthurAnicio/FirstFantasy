import styles from './Building.module.css'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSound } from '@/contexts/SoundContext'

interface BuildingProps{
    top?:number
    right?:number
    bottom?:number
    left?:number
    image: string
    path?: string
    name?: string
    w:number
    h:number
}

export function Building({
    top,
    right,
    bottom,
    left,
    image,
    name,
    w,
    h,
    path,
}:BuildingProps){

    const { play } = useSound();

    const style: React.CSSProperties = 
     {
        position: 'absolute',
        top,
        right,
        bottom,
        left,
      }

    const router = useRouter()

    function enter(){
        if(path){
            play('Enter.mp3')
            setTimeout(() => {
                router.push(path)
            }, 300);
        }
    }

    return(
            <div
                className={styles.wraper}
                style={style}
                onClick={enter}
            >
                <Image
                    width={w}
                    height={h} 
                    src={image}
                    alt={name!}
                    className={path?styles.build:''}
                />
                { path && 
                    <p className={styles.title}>
                        {name}
                    </p>
                }
            </div>
                
    )
}