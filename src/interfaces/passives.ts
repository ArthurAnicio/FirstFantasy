import { BonusTypes } from "@/enums/bonusTypes"
import { DamageTypes } from "@/enums/damageTypes"

export interface Passives{
  name:string
  image:string
  cost:number
  typeBonus: BonusTypes
  bonusNum?:number
  bonusDamageType?:DamageTypes
}