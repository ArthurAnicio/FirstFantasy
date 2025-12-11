export function calcHealth(level:number,constitution:number,bonus:number):number{
    return bonus+10+(level*(constitution+5))
}

export function calcStamina(level:number,presence:number,constitution:number,bonus:number):number{
    return bonus+4+(level*(presence+5+(constitution/2)))
}

export function calcDefense(dexterity:number,bonus:number):number{
    return bonus+10+dexterity
}