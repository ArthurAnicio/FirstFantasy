import { DamageTypes } from "@/enums/damageTypes"
import { EffectTypes } from "@/enums/effectTypes"
import { Atribute } from "@/enums/atribute"

export interface Attack {
  id: number
  name: string
  image: string
  atribute: Atribute
  damageType: DamageTypes
  damageQuant: number
  damageDice: number
  criticalRatio: number
  criticalBonus: number
  effect: EffectTypes
  costStamina: number
}