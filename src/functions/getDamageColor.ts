import { DamageTypes } from "@/enums/damageTypes";

export function getDamageColor(type:DamageTypes){
    switch(type){
        case DamageTypes.fire:
            return "var(--orange-p)"
        case DamageTypes.physical:
            return "var(--red-p)"
        case DamageTypes.ice:
            return "var(--light-blue-t)"
        case DamageTypes.poison:
            return "var(--green-p)"
        case DamageTypes.psychic:
            return "var(--pink-p)"
        case DamageTypes.thunder:
            return "var(--purple-f)"
    }
}