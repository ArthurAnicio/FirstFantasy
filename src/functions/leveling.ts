export interface LevelingRewards{
    rewardAtributePoints: number;
    rewardTechnicalPoints: number;
}

export function leveling(level:number):LevelingRewards{

    switch(level){
        case 2:
            return { rewardAtributePoints: 0, rewardTechnicalPoints: 2 }
            break
        case 3:
            return { rewardAtributePoints: 0, rewardTechnicalPoints: 2 }
            break
        case 4:
            return { rewardAtributePoints: 0, rewardTechnicalPoints: 2 }
            break
        case 5:
            return { rewardAtributePoints: 1, rewardTechnicalPoints: 4 }
            break
        case 6:
            return { rewardAtributePoints: 0, rewardTechnicalPoints: 2 }
            break
        case 7:
            return { rewardAtributePoints: 0, rewardTechnicalPoints: 2 }
            break
        case 8:
            return { rewardAtributePoints: 0, rewardTechnicalPoints: 2 }
            break
        case 9:
            return { rewardAtributePoints: 0, rewardTechnicalPoints: 2 }
            break
        case 10:
            return { rewardAtributePoints: 1, rewardTechnicalPoints: 4 }
            break
        default:
            return { rewardAtributePoints: 0, rewardTechnicalPoints: 0}
            break
    }
}