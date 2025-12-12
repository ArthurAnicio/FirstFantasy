import { Atribute } from "@/enums/atribute";
import { DamageTypes } from "@/enums/damageTypes";
import { EffectTypes } from "@/enums/effectTypes";
import { Attack } from "@/interfaces/attack";

export const defaultAttacks:Attack[] = [
    {
        name:"Golpear",
        image:"/images/attacks/strikeDefault.png",
        atribute: Atribute.strength,
        damageType: DamageTypes.physical,
        damageQuant: 1,
        damageDice: 6,
        criticalRatio: 19,
        criticalBonus: 2,
        effect: EffectTypes.none,
        costStamina: 0
    }
]