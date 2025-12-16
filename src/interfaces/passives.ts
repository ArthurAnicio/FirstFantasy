import { BonusTypes } from "@/enums/bonusTypes"
import { DamageTypes } from "@/enums/damageTypes"

export interface Passives{
  id:string
  name:string
  image:string
  description:string
  typeBonus: BonusTypes
  bonusNum?:number
  bonusDamageType?:DamageTypes
  price:number
}