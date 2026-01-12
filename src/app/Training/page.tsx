/* eslint-disable react/jsx-key */
'use client'
import styles from './Training.module.css'
import { useState } from 'react'
import { Leave } from '@/components/Leave'
import { Wallet } from '@/components/Wallet'
import { Attack } from '@/interfaces/attack'
import { Atribute } from '@/enums/atribute'
import { DamageTypes } from '@/enums/damageTypes'
import { EffectTypes } from '@/enums/effectTypes'
import { AttackShop } from '@/components/AttackShop'
import { PassiveShop } from '@/components/PassiveShop'
import { passivesPlayer } from '../../../public/objects/passives/passivesPlayer'
import { usePlayer } from '@/contexts/PlayerContext'

const testAttack:Attack={
    id: 'teste',
    name: 'Louvor das Ilhas',
    image: 'https://ddragon.leagueoflegends.com/cdn/16.1.1/img/spell/YorickR.png',
    atribute: Atribute.mind,
    damageDice: 8,
    damageQuant: 3,
    damageType: DamageTypes.physical,
    criticalBonus: 3,
    criticalRatio: 17,
    effect: EffectTypes.none,
    costStamina: 6
}

export default function Training(){

    const [selected,setSelected] = useState(1)
    const {attacks, passives} = usePlayer()

    return(
        <div className={styles.container}>
            <Wallet isCash={false}/>
            <Leave/>
            <h1>Campo de trinamento</h1>
            <p>Aprenda novos ataques e habilidades</p>
            <div className={styles.shop}>
                <div className={styles.options}>
                    <div 
                        className={styles.option} 
                        id={selected==1?styles.selected:''}
                        onClick={()=>setSelected(1)}
                    >
                        Ataques
                    </div>
                    <div 
                        className={styles.option} 
                        id={selected==2?styles.selected:''}
                        onClick={()=>setSelected(2)}
                    >
                        Habilidades
                    </div>
                </div>
                <div className={styles.items}>
                    {
                        selected==1?
                            <AttackShop attack={testAttack} price={20}/>
                        :
                            passivesPlayer
                            .filter(passiveLoja =>
                                !passives?.some(passivePlayer => passivePlayer.id === passiveLoja.id)
                            )
                            .map(passive => (
                                <PassiveShop key={passive.id} passive={passive} />
                            ))
                                
                    }
                </div>
            </div>
        </div>
    )

}