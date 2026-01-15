import styles from './Menu.module.css'
import { useSound } from '@/contexts/SoundContext'
import { useMusic } from '@/contexts/MusicContext'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/navigation'

export function Menu(){

    const rounter = useRouter()
    const [option,setOption] = useState(0)
    const [isMenuOpen,setIsMenuOpen] = useState(false)
    const {changeSVolume, volume: soundVolume} = useSound()
    const {changeMVolume, volume: musicVolume} = useMusic()

    function abreFechaMenu(){
        if (isMenuOpen){
            setIsMenuOpen(false)
        }else{
            setIsMenuOpen(true)
        }
    }

    function options(o: number){
        switch(option){
            default:
               return(
                    <div className={styles.options}>
                        <h2>Menu</h2>
                        <button onClick={()=>setOption(1)}>Audio</button>
                        <button>Outro</button>
                        <button>Outro</button>
                        <button onClick={()=>rounter.push('/')}>Sair</button>
                    </div>
               )
            case 1:
                return(
                    <div className={styles.options}>
                        <h2>Audio</h2>
                        
                        {/* SFX Volume */}
                        <div className={styles.sliderContainer}>
                            <label>Sons: {Math.round(soundVolume * 100)}%</label>
                            <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={soundVolume}
                            onChange={(e) => changeSVolume(parseFloat(e.target.value))}
                            className={styles.slider}
                            />
                        </div>

                        {/* Music Volume */}
                        <div className={styles.sliderContainer}>
                            <label>Música: {Math.round(musicVolume * 100)}%</label>
                            <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={musicVolume}
                            onChange={(e) => changeMVolume(parseFloat(e.target.value))}
                            className={styles.slider}
                            />
                        </div>

                        <button onClick={() => setOption(0)}>Voltar</button>
                    </div>
                ) 
        }
    }

    return(
        <>
            <div className={styles.menuIcon} onClick={abreFechaMenu}>
                <FontAwesomeIcon icon={faBars}/>
            </div>
            {
                isMenuOpen &&
                    <div className={styles.container}>
                        {options(option)}
                    </div> 
            }
        </>
    )
}