/* eslint-disable react-hooks/exhaustive-deps */
import Image from 'next/image'
import { Attack } from '@/interfaces/attack'
import styles from './AttackChoice.module.css'
import { usePlayer } from '@/contexts/PlayerContext'
import { Atribute } from '@/enums/atribute'
import { getDamageColor } from '@/functions/getDamageColor'
import { getDamageIcon } from '@/functions/getDamageIcon'
import { IconAtribute } from '@/functions/IconAtribute'
import { useEffect, useState } from 'react'
import { useSound } from '@/contexts/SoundContext'

interface AttackChoiceProps{
    attack:Attack
}

export function AttackChoice({attack}:AttackChoiceProps){

    const {strength,dexterity,constitution,mind,presence,bonusAttack,equipedAttacks,equipAttack,unequipAttack} = usePlayer()
    const { play } = useSound()
    const color = getDamageColor(attack.damageType)
    const [equiped,setEquiped] = useState(false)

    useEffect(()=>{
        const isEquiped = equipedAttacks.filter((atk)=>atk.id===attack.id).length
        if(isEquiped>0){
            setEquiped(true)
        }else{
            setEquiped(false)
        }
    },[equipedAttacks])

    function getAtribute(){
        switch(attack.atribute){
            case Atribute.strength:
                return strength
            case Atribute.dexterity:
                return dexterity
            case Atribute.constitution:
                return constitution
            case Atribute.mind:
                return mind
            case Atribute.presence:
                return presence
        }
    }

    function EquipAttack(){
        if(equipedAttacks.length<6&&equiped==false){
            play('Equip.mp3')
            setTimeout(() => {
                equipAttack!(attack)
            }, 100);
        }else if(equiped){
            if(equipedAttacks.length>1){
                play('Unequip.mp3')
                setTimeout(() => {
                    unequipAttack!(attack)
                }, 100);
            }
        }
    }

    return(
        <div className={styles.wraper}>
            <div 
                className={styles.card}
                id={equiped?styles.selected:''}
                onClick={EquipAttack}
            >
                <Image 
                    alt={attack.name} 
                    src={attack.image} 
                    width={120} 
                    height={120}
                    style={{margin:"0 auto"}}
                />
                <p className={styles.title} style={{color}}>{attack.name}</p>
                <div className={styles.stamina}>
                    <p style={{transform:"rotate(-45deg)"}}>{attack.costStamina}</p>
                </div>
            </div>
            <div className={styles.info}>
                <p style={{color}}>
                    {attack.name}
                </p>
                <p>
                    Ataque: 
                    <IconAtribute atribute={attack.atribute}/>
                    {getAtribute()} d20 {bonusAttack>0?`+${bonusAttack}`:''}
                </p>
                <p>
                    Dano: 
                    <label style={{color}}>
                        {attack.damageQuant}d{attack.damageDice} {getDamageIcon(attack.damageType)}{attack.damageType}
                    </label>
                </p>
                <p>
                    Critico: {attack.criticalRatio<20? `${attack.criticalRatio}-20 ` : "20"} / x{attack.criticalBonus}
                </p>
                <p>
                    Stamina: 
                    <label style={{color:"var(--light-blue-t)"}}>
                        {attack.costStamina}
                    </label>
                </p>
            </div>
        </div>
    )
}