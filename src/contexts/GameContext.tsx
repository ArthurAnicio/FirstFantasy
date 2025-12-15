"use client"

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react"

import Cookies from "js-cookie"

import {
  calcDefense,
  calcHealth,
  calcStamina,
} from "../functions/calcStats"

import { Atribute } from "@/enums/atribute"
import { DamageTypes } from "@/enums/damageTypes"
import { Attack } from "@/interfaces/attack"
import { levelFromXp } from "@/functions/xpFormulas"

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

  resistences: DamageTypes[]
  vulnerabilites: DamageTypes[]
  imunites: DamageTypes[]

  changeName?: (text: string) => void
  changeGender?: (gender: string) => void
  changeImage?: (url: string) => void
  changeCash?: (quant: number) => void
  changeTechniquePoints?: (amount: number) => void
  changeAtributePoints?: (amount: number) => void

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

  addResistence?: (resistence: DamageTypes) => void
  addVulnerabilite?: (v: DamageTypes) => void
  addImunite?: (v: DamageTypes) => void

  changeStat?: (stat: Atribute, amount: number) => void
}

const GameContext = createContext<Character | undefined>(undefined)

const defaultPlayer: Character = {
  name: "",
  gender: "",
  image: "",
  xp: 0,
  level: 1,
  cash: 20,
  techniquePoints: 10,
  atributePoints: 0,
  defense: 0,
  maxHealth: 1,
  actualHealth: 1,
  maxStamina: 1,
  actualStamina: 1,
  strength: 0,
  dexterity: 0,
  constitution: 0,
  mind: 0,
  presence: 0,
  bonusAttack: 0,
  bonusDefence: 0,
  bonusHealth: 0,
  bonusStamina: 0,
  attacks: [],
  equipedAttacks: [],
  resistences: [],
  vulnerabilites: [],
  imunites: [],
}

function loadPlayer(): Character {
  try {
    const raw = Cookies.get("player")
    if (!raw) return defaultPlayer
    const parsed = JSON.parse(raw)
    return { ...defaultPlayer, ...parsed }
  } catch {
    return defaultPlayer
  }
}

export function GameProvider({ children }: { children: React.ReactNode }) {
  const player: Character = loadPlayer()

  const [name, setName] = useState(player.name)
  const [gender, setGender] = useState(player.gender)
  const [image, setImage] = useState(player.image)

  const [xp, setXpState] = useState(player.xp ?? 0)
  const [level, setLevel] = useState(
    player.level ?? levelFromXp(player.xp ?? 0)
  )

  const [cash, setCash] = useState(player.cash)
  const [techniquePoints, setTechniquePoints] = useState(
    player.techniquePoints
  )
  const [atributePoints, setAtributePoints] = useState(
    player.atributePoints ?? 0
  )

  const [strength, setStrength] = useState(player.strength)
  const [dexterity, setDexterity] = useState(player.dexterity)
  const [constitution, setConstitution] = useState(player.constitution)
  const [presence, setPresence] = useState(player.presence)
  const [mind, setMind] = useState(player.mind)

  const [bonusAttack, setBonusAttack] = useState(player.bonusAttack)
  const [bonusDefence, setBonusDefence] = useState(player.bonusDefence)
  const [bonusHealth, setBonusHealth] = useState(player.bonusHealth)
  const [bonusStamina, setBonusStamina] = useState(player.bonusStamina)

  const [defense, setDefense] = useState(calcDefense(dexterity, bonusDefence))
  const [maxHealth, setMaxHealth] = useState(
    calcHealth(level, constitution, bonusHealth)
  )
  const [actualHealth, setActualHealth] = useState(player.maxHealth)
  const [maxStamina, setMaxStamina] = useState(
    calcStamina(level, presence, constitution, bonusStamina)
  )
  const [actualStamina, setActualStamina] = useState(player.maxStamina)

  const [attacks, setAttacks] = useState<Attack[]>(player.attacks ?? [])
  const [equipedAttacks, setEquipedAttacks] = useState<Attack[]>(
    player.equipedAttacks ?? []
  )
  const [resistences, setResistences] = useState<DamageTypes[]>(
    player.resistences ?? []
  )
  const [vulnerabilites, setVulnerabilites] = useState<DamageTypes[]>(
    player.vulnerabilites ?? []
  )
  const [imunites, setImunites] = useState<DamageTypes[]>(
    player.imunites ?? []
  )

  useEffect(() => {
    setLevel(levelFromXp(xp))
  }, [xp])

  useEffect(() => {
    setDefense(calcDefense(dexterity, bonusDefence))
    setMaxHealth(calcHealth(level, constitution, bonusHealth))
    setMaxStamina(calcStamina(level, presence, constitution, bonusStamina))
  }, [dexterity, level, constitution, presence, bonusDefence, bonusHealth, bonusStamina])

  useEffect(() => {
    const playerToSave: Character = {
      name,
      gender,
      image,
      xp,
      level,
      cash,
      techniquePoints,
      defense,
      maxHealth,
      actualHealth,
      maxStamina,
      actualStamina,
      strength,
      dexterity,
      constitution,
      mind,
      presence,
      bonusAttack,
      bonusDefence,
      bonusHealth,
      bonusStamina,
      attacks,
      equipedAttacks,
      resistences,
      vulnerabilites,
      imunites,
    }

    Cookies.set("player", JSON.stringify(playerToSave), {
      expires: 365 * 20,
    })
  }, [
    name,
    gender,
    image,
    xp,
    level,
    cash,
    techniquePoints,
    strength,
    dexterity,
    constitution,
    presence,
    mind,
    bonusAttack,
    bonusDefence,
    bonusHealth,
    bonusStamina,
    defense,
    maxHealth,
    maxStamina,
    actualHealth,
    actualStamina,
    attacks,
    equipedAttacks,
    resistences,
    vulnerabilites,
    imunites,
  ])


  const changeName = useCallback((text: string) => {
    setName(text)
  }, [])

  const changeGender = useCallback((g: string) => {
    setGender(g)
  }, [])

  const changeImage = useCallback((url: string) => {
    setImage(url)
  }, [])

  const changeCash = useCallback((quant: number) => {
    setCash(quant)
  }, [])

  const changeTechniquePoints = useCallback((amount: number) => {
    setTechniquePoints(amount)
  }, [])

  const changeAtributePoints = useCallback((amount: number) => {
    setAtributePoints(amount)
  }, [])

  const setXp = useCallback((amount: number) => {
    setXpState(amount)
  }, [])

  const addXp = useCallback((amount: number) => {
    setXpState(prev => Math.max(0, prev + amount))
  }, [])

  const recover = useCallback(
    (stat: string, amount: number, max?: boolean) => {
      if (stat === "health") {
        if (max) {
          setActualHealth(maxHealth)
        } else {
          setActualHealth(prev =>
            prev + amount >= maxHealth ? maxHealth : prev + amount
          )
        }
      } else {
        if (max) {
          setActualStamina(maxStamina)
        } else {
          setActualStamina(prev =>
            prev + amount >= maxStamina ? maxStamina : prev + amount
          )
        }
      }
    },
    [maxHealth, maxStamina]
  )

  const takeDamage = useCallback(
    (damage: number, type: DamageTypes) => {
      setActualHealth(prev => {
        const isResistent = resistences.includes(type)
        const isVulnerable = vulnerabilites.includes(type)
        const isImmune = imunites.includes(type)

        if (isImmune) return prev

        let effectiveDamage = damage
        if (isResistent) effectiveDamage = effectiveDamage / 2
        if (isVulnerable) effectiveDamage = effectiveDamage * 2

        const next = prev - effectiveDamage
        return next <= 0 ? 0 : next
      })
    },
    [resistences, vulnerabilites, imunites]
  )

  const useStamina = useCallback((amount: number) => {
    setActualStamina(prev => (prev - amount <= 0 ? 0 : prev - amount))
  }, [])

  const levelUp = useCallback(() => {
    setLevel(prev => prev + 1)
  }, [])

  const bonusAttackUp = useCallback((amount: number) => {
    setBonusAttack(amount)
  }, [])

  const defenseBonusUp = useCallback((amount: number) => {
    setBonusDefence(amount)
  }, [])

  const healthBonusUp = useCallback((amount: number) => {
    setBonusHealth(amount)
  }, [])

  const staminaBonusUp = useCallback((amount: number) => {
    setBonusStamina(amount)
  }, [])

  const addAttack = useCallback((attack: Attack) => {
    setAttacks(prev => [...prev, attack])
  }, [])

  const equipAttack = useCallback((attack: Attack) => {
    setEquipedAttacks(prev => [...prev, attack])
  }, [])

  const unequipAttack = useCallback((attackName: string) => {
    setEquipedAttacks(prev => prev.filter(a => a.name !== attackName))
  }, [])

  const addResistence = useCallback((resistence: DamageTypes) => {
    setResistences(prev => [...prev, resistence])
  }, [])

  const addVulnerabilite = useCallback((v: DamageTypes) => {
    setVulnerabilites(prev => [...prev, v])
  }, [])

  const addImunite = useCallback((v: DamageTypes) => {
    setImunites(prev => [...prev, v])
  }, [])

  const changeStat = useCallback((stat: Atribute, amount: number) => {
    switch (stat) {
      case Atribute.strength:
        setStrength(amount)
        break
      case Atribute.dexterity:
        setDexterity(amount)
        break
      case Atribute.constitution:
        setConstitution(amount)
        break
      case Atribute.mind:
        setMind(amount)
        break
      case Atribute.presence:
        setPresence(amount)
        break
    }
  }, [])

  const value: Character = {
    name,
    gender,
    image,
    xp,
    level,
    cash,
    techniquePoints,
    atributePoints,
    defense,
    maxHealth,
    actualHealth,
    maxStamina,
    actualStamina,
    strength,
    dexterity,
    constitution,
    mind,
    presence,
    bonusAttack,
    bonusDefence,
    bonusHealth,
    bonusStamina,
    equipedAttacks,
    attacks,
    resistences,
    vulnerabilites,
    imunites,
    changeName,
    changeGender,
    changeImage,
    changeCash,
    changeTechniquePoints,
    addXp,
    setXp,
    recover,
    takeDamage,
    useStamina,
    levelUp,
    bonusAttackUp,
    defenseBonusUp,
    healthBonusUp,
    staminaBonusUp,
    addAttack,
    equipAttack,
    unequipAttack,
    addResistence,
    addVulnerabilite,
    addImunite,
    changeStat,
  }

  return (
    <GameContext.Provider value={value}>{children}</GameContext.Provider>
  )
}

export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error("useGame deve estar dentro de GameProvider")
  return ctx
}
