import { Atribute } from "@/enums/atribute";
import { DamageTypes } from "@/enums/damageTypes";
import { EffectTypes } from "@/enums/effectTypes";
import { Attack } from "@/interfaces/attack";

export const defaultAttacks: Attack[] = [
    {
        id: 1,
        name: "Golpe Forte",
        image: "/images/attacks/defaults/default.png",
        atribute: Atribute.strength,
        damageType: DamageTypes.physical,
        damageQuant: 1,
        damageDice: 6,
        criticalRatio: 20,
        criticalBonus: 2,
        effect: EffectTypes.none,
        costStamina: 0
    },
    {
        id: 2,
        name: "Golpe Rápido",
        image: "/images/attacks/defaults/default.png",
        atribute: Atribute.dexterity,
        damageType: DamageTypes.physical,
        damageQuant: 1,
        damageDice: 6,
        criticalRatio: 20,
        criticalBonus: 2,
        effect: EffectTypes.none,
        costStamina: 0
    },
    {
        id: 3,
        name: "Golpe Preciso",
        image: "/images/attacks/defaults/default.png",
        atribute: Atribute.mind,
        damageType: DamageTypes.physical,
        damageQuant: 1,
        damageDice: 6,
        criticalRatio: 20,
        criticalBonus: 2,
        effect: EffectTypes.none,
        costStamina: 0
    },
    {
        id: 4,
        name: "Golpe Resistente",
        image: "/images/attacks/defaults/default.png",
        atribute: Atribute.constitution,
        damageType: DamageTypes.physical,
        damageQuant: 1,
        damageDice: 6,
        criticalRatio: 20,
        criticalBonus: 2,
        effect: EffectTypes.none,
        costStamina: 0
    },
    {
        id: 5,
        name: "Golpe Impactante",
        image: "/images/attacks/defaults/default.png",
        atribute: Atribute.presence,
        damageType: DamageTypes.physical,
        damageQuant: 1,
        damageDice: 6,
        criticalRatio: 20,
        criticalBonus: 2,
        effect: EffectTypes.none,
        costStamina: 0
    }
]