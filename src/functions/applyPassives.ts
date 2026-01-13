/* eslint-disable react-hooks/rules-of-hooks */
import { Passives } from "../interfaces/passives";
import { BonusTypes } from "@/enums/bonusTypes";
import { Atribute } from "@/enums/atribute";
import { usePlayer } from "@/contexts/PlayerContext";

export function applyPassive(passive: Passives){
    
  const {
    changeStat,
    bonusAttackUp,
    healthBonusUp,
    defenseBonusUp,
    staminaBonusUp,
    addResistence,
    addVulnerabilite,
    addImunite,
    attacks,
    equipedAttacks
  } = usePlayer();

  switch(passive.typeBonus){
    case BonusTypes.bonusCriticalDamage:
      attacks.forEach((atk)=>{
        atk.criticalBonus += passive.bonusNum
      })
      equipedAttacks.forEach((atk)=>{
        atk.criticalBonus += passive.bonusNum
      })
      break
    case BonusTypes.bonusCriticalRatio:
      attacks.forEach((atk)=>{
        atk.criticalRatio -= passive.bonusNum
      })
      equipedAttacks.forEach((atk)=>{
        atk.criticalRatio -= passive.bonusNum
      })
      break
    case BonusTypes.bonusAttack:
      bonusAttackUp!(passive.bonusNum)
      break
    case BonusTypes.bonusDefense:
      defenseBonusUp!(passive.bonusNum)
      break
    case BonusTypes.bonusHp:
      healthBonusUp!(passive.bonusNum)
      break
    case BonusTypes.bonusStamina:
      staminaBonusUp!(passive.bonusNum)
      break
    case BonusTypes.resistence:
      addResistence!(passive.bonusDamageType)
      break
    case BonusTypes.vulnerabilite:
      addVulnerabilite!(passive.bonusDamageType)
      break
    case BonusTypes.imunite:
      addImunite!(passive.bonusDamageType)
      break
    case BonusTypes.bonusStat:
      switch(passive.bonusStat){
        case Atribute.constitution:
            changeStat!(Atribute.constitution,1)
            break
        case Atribute.strength:
            changeStat!(Atribute.strength,1)
            break
        case Atribute.dexterity:
            changeStat!(Atribute.dexterity,1)
            break
        case Atribute.mind:
            changeStat!(Atribute.mind,1)
            break
        case Atribute.presence:
            changeStat!(Atribute.presence,1)
            break
      }
  }

}