import { DamageTypes } from "@/enums/damageTypes";

export function damageSound(dmgType:DamageTypes):string{
    switch(dmgType){
        case DamageTypes.physical:
            return 'Strike.mp3'
        case DamageTypes.fire:
            return 'FireStrike.mp3'
        case DamageTypes.ice:
            return 'IceStrike.mp3'
        case DamageTypes.thunder:
            return 'ThunderStrike.mp3'
        case DamageTypes.poison:
            return 'PoisonStrike.mp3'
        case DamageTypes.psychic:
            return 'PsychicStrike.mp3'
        default:
            return ''
    }
}