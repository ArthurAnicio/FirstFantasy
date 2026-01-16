import styles from './Building.module.css'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSound } from '@/contexts/SoundContext'
import { useMusic } from '@/contexts/MusicContext'

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
    soundTrack?: string
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
    soundTrack
}:BuildingProps){

    const { playMusic, stopMusic } = useMusic()

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
            stopMusic()
            play('Enter.mp3')
            if(soundTrack){
                playMusic(soundTrack)
            }
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