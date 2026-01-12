'use client'
import styles from './Training.module.css'
import { useState } from 'react'
import { Leave } from '@/components/Leave'
import { Wallet } from '@/components/Wallet'
import { Attack } from '@/interfaces/attack'
import { Passives } from '@/interfaces/passives'
import { Atribute } from '@/enums/atribute'
import { DamageTypes } from '@/enums/damageTypes'
import { EffectTypes } from '@/enums/effectTypes'
import { BonusTypes } from '@/enums/bonusTypes'
import { AttackShop } from '@/components/AttackShop'
import { PassiveShop } from '@/components/PassiveShop'

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

const testPassive:Passives={
    id: 'sss',
    name: 'Pastor de Almas',
    image: 'https://ddragon.leagueoflegends.com/cdn/16.1.1/img/passive/Yorick_P.png',
    description: 'Teste',
    typeBonus: BonusTypes.bonusAttack,
    bonusNum: 6,
    bonusDamageType: DamageTypes.physical,
    bonusStat: Atribute.strength,
    price: 10
}

export default function Training(){

    const [selected,setSelected] = useState(1)

    return(
        <div className={styles.container}>
            <Wallet/>
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
                            <PassiveShop passive={testPassive}/>
                    }
                </div>
            </div>
        </div>
    )

}