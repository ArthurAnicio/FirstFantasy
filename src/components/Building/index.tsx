import styles from './Building.module.css'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

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

    const style: React.CSSProperties = 
     {
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