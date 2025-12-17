import { Atribute } from "@/enums/atribute";
import { DamageTypes } from "@/enums/damageTypes";
import { EffectTypes } from "@/enums/effectTypes";
import { Attack } from "@/interfaces/attack";

export const starterAttacks:Attack[] = [
    {
        id:'atk-stater-1',
        name:"Corte Flamejante",
        image:"/images/attacks/pre.png",
        atribute: Atribute.presence,
        damageType: DamageTypes.fire,
        damageQuant: 2,
        damageDice: 6,
        criticalRatio: 20,
        criticalBonus: 2,
        effect: EffectTypes.none,
        costStamina: 1
    },
    {
        id:'atk-stater-2',
        name:"Tormento",
        image:"/images/attacks/min.png",
        atribute: Atribute.mind,
        damageType: DamageTypes.psychic,
        damageQuant: 1,
        damageDice: 10,
        criticalRatio: 19,
        criticalBonus: 2,
        effect: EffectTypes.none,
        costStamina: 1
    },
    {
        id:'atk-stater-3',
        name:"Pressão Latente",
        image:"/images/attacks/cons.png",
        atribute: Atribute.constitution,
        damageType: DamageTypes.physical,
        damageQuant: 2,
        damageDice: 8,
        criticalRatio: 19,
        criticalBonus: 3,
        effect: EffectTypes.none,
        costStamina: 2
    },
    {
        id:'atk-stater-4',
        name:"Golpe Relâmpago",
        image:"/images/attacks/dex.png",
        atribute: Atribute.dexterity,
        damageType: DamageTypes.thunder,
        damageQuant: 3,
        damageDice: 4,
        criticalRatio: 18,
        criticalBonus: 2,
        effect: EffectTypes.none,
        costStamina: 1
    },
    {
        id:'atk-stater-5',
        name:"Impacto Forte",
        image:"/images/attacks/str.png",
        atribute: Atribute.strength,
        damageType: DamageTypes.physical,
        damageQuant: 1,
        damageDice: 8,
        criticalRatio: 20,
        criticalBonus: 2,
        effect: EffectTypes.none,
        costStamina: 1
    }
]