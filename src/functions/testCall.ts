import { TestResult } from "@/interfaces/testResult";
import { rollDice } from "./rollDice";

export function testCall(amountDices:number,bonus:number,criticalRatio:number,defense:number):TestResult{
    let i = 1
    let biggestResult=0
    while(i<=amountDices){
        let result = rollDice(20)
        if(result>=biggestResult){
            biggestResult=result
        }
        i++
    }
    const result = biggestResult+bonus

    if(biggestResult>=criticalRatio){
            return {result, critical: true, failure:false}
    }else if(result>=defense){
       return {result, critical: false, failure:false}
        
    }else{
        return {result, critical: false, failure:true}
    }
}