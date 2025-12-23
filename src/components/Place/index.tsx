import styles from './Place.module.css'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface PlaceProps{
    top?:number
    right?:number
    bottom?:number
    left?:number
    image: string
    path?: string
    name: string
    w:number
    h:number
    centered?: boolean
}

export function Place({
    top,
    right,
    bottom,
    left,
    image,
    name,
    w,
    h,
    centered
}:PlaceProps){

    const style: React.CSSProperties = centered
    ? {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }
    : {
        position: 'absolute',
        top,
        right,
        bottom,
        left,
      }

    return(
            <div
                className={styles.wraper}
                style={style}
            >
                <Image
                width={w}
                height={h} 
                    src={image}
                    alt={name}
                    className={styles.place}
                />
                <p className={styles.title}>
                    {name}
                </p>
            </div>
                
    )
}