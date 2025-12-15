import { testCall } from "./testCall";
import { rollDice } from "./rollDice";
import { Attack } from "@/interfaces/attack";
import { TestResult } from "@/interfaces/testResult";

export function attackCall(stat:number,bonusAttack:number,targetDefense:number,attack:Attack):TestResult{
    
    const attackTest = testCall(stat,bonusAttack,attack.criticalRatio,targetDefense)
    
    if(attackTest.failure==false){
        if(attackTest.critical){
            let i=1
            let damage = 0
            while(i<=(attack.damageQuant*attack.criticalBonus)){
                damage+=rollDice(attack.damageDice)
                i++
            }
            return {damage, result:attackTest.result, critical:true, failure: false}
        }else{
            let i=1
            let damage = 0
            while(i<=(attack.damageQuant)){
                damage+=rollDice(attack.damageDice)
                i++
            }
            return {damage, result:attackTest.result, critical:true, failure: false}
        }
    }else{
        return {damage:0, result: attackTest.result, critical: false, failure: true}
    }
}