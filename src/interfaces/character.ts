import { Atribute } from "@/enums/atribute"
import { DamageTypes } from "@/enums/damageTypes"
import { Attack } from "./attack"
import { Passives } from "./passives"

export interface Character {
  name: string
  gender: string
  image: string

  xp: number
  level: number

  cash?: number
  techniquePoints?: number
  atributePoints?: number

  defense: number
  maxHealth: number
  actualHealth: number
  maxStamina: number
  actualStamina: number

  strength: number
  dexterity: number
  constitution: number
  mind: number
  presence: number

  bonusAttack: number
  bonusDefence: number
  bonusHealth: number
  bonusStamina: number

  equipedAttacks: Attack[]
  attacks: Attack[]

  passives?: Passives[]

  resistences: DamageTypes[]
  vulnerabilites: DamageTypes[]
  imunites: DamageTypes[]

  changeName?: (text: string) => void
  changeGender?: (gender: string) => void
  changeImage?: (url: string) => void
  changeCash?: (quant: number) => void
  changeTechniquePoints?: (amount: number) => void
  changeAtributePoints?: (amount: number) => void

  changeActualHealth?:(amount:number)=>void
  changeActualStamina?:(amount:number)=>void

  addXp?: (amount: number) => void
  setXp?: (amount: number) => void

  recover?: (stat: string, amount: number, max?: boolean) => void
  takeDamage?: (damage: number, type: DamageTypes) => void
  useStamina?: (amount: number) => void

  levelUp?: () => void

  bonusAttackUp?: (amount: number) => void
  defenseBonusUp?: (amount: number) => void
  healthBonusUp?: (amount: number) => void
  staminaBonusUp?: (amount: number) => void

  addAttack?: (attack: Attack) => void
  equipAttack?: (attack: Attack) => void
  unequipAttack?: (attackName: string) => void
  addPassive?: (passive: Passives) => void

  addResistence?: (resistence: DamageTypes) => void
  addVulnerabilite?: (v: DamageTypes) => void
  addImunite?: (v: DamageTypes) => void

  changeStat?: (stat: Atribute, amount: number) => void
}