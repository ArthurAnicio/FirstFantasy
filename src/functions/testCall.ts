import { TestResult } from "@/interfaces/testResult";
import { rollDice } from "./rollDice";

export function testCall(amountDices:number,bonus:number,criticalRatio:number,defense:number):TestResult{
    let i = 1
    let choicedResult:number
    if(amountDices==0){
        const firstRoll = rollDice(20)
        const secondRoll = rollDice(20)
        choicedResult = Math.min(firstRoll, secondRoll);
    }else if(amountDices==1){
        choicedResult = rollDice(20)
    }else{
        choicedResult = rollDice(20)
        while(i<=amountDices-1){
            const result = rollDice(20)
            if(result>=choicedResult){
                choicedResult=result
            }
            i++
        }
    }
    const result = choicedResult+bonus

    if(choicedResult>=criticalRatio){
        return {result, critical: true, failure:false}
    }else if(result>=defense){
       return {result, critical: false, failure:false}
        
    }else{
        return {result, critical: false, failure:true}
    }
}