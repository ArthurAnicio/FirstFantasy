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

export interface TestResult {
  damage?: number
  result: number
  critical: boolean
  failure: boolean
}

export enum DamageTypes {
  physical,
  fire,
  ice,
  thunder,
  poison,
  psychic,
}

export enum EffectTypes {
  stun,
  burn,
  frozen,
  eletrify,
  weak,
  slow,
  healing,
  none,
}

export interface Attack {
  name: string
  image: string
  atribute: string
  damageType: DamageTypes
  damageQuant: number
  damageDice: number
  criticalRatio: number
  criticalBonus: number
  effect: EffectTypes
  costStamina: number
  price: number
}

export interface Character {
  name: string
  gender: string
  image: string
  cash?: number
  level: number
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
  bonusDefence: number
  bonusHealth: number
  bonusStamina: number
  attacks: Attack[]
  resistences: DamageTypes[]
  vulnerabilites: DamageTypes[]
  changeName?: (text: string) => void
  changeGender?: (gender: string) => void
  changeImage?: (url: string) => void
  changeCash?: (quant: number) => void
  recover?: (stat: string, amount: number) => void
  takeDamage?: (damage: number, type: DamageTypes) => void
  useStamina?: (amount: number) => void
  levelUp?: () => void
  defenseBonusUp?: (amount: number) => void
  healthBonusUp?: (amount: number) => void
  staminaBonusUp?: (amount: number) => void
  addAttack?: (attack: Attack) => void
  addResistence?: (resistence: DamageTypes) => void
  addVulnerabilite?: (v: DamageTypes) => void
  changeStat?: (stat: string, amount: number) => void
}

const GameContext = createContext<Character | undefined>(undefined)

const defaultPlayer: Character = {
  name: "",
  gender: "",
  image: "",
  cash: 20,
  level: 1,
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
  bonusDefence: 0,
  bonusHealth: 0,
  bonusStamina: 0,
  attacks: [],
  resistences: [],
  vulnerabilites: [],
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
  const [cash, setCash] = useState(player.cash)
  const [strength, setStrength] = useState(player.strength)
  const [dexterity, setDexterity] = useState(player.dexterity)
  const [constitution, setConstitution] = useState(player.constitution)
  const [presence, setPresence] = useState(player.presence)
  const [mind, setMind] = useState(player.mind)
  const [level, setLevel] = useState(player.level)
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
  const [resistences, setResistences] = useState<DamageTypes[]>(
    player.resistences ?? []
  )
  const [vulnerabilites, setVulnerabilites] = useState<DamageTypes[]>(
    player.vulnerabilites ?? []
  )

  useEffect(() => {
    const playerToSave: Character = {
      name,
      gender,
      image,
      cash,
      level,
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
      bonusDefence,
      bonusHealth,
      bonusStamina,
      attacks,
      resistences,
      vulnerabilites,
    }

    Cookies.set("player", JSON.stringify(playerToSave), {
      expires: 365 * 20,
    })
  }, [
    name,
    gender,
    image,
    cash,
    level,
    strength,
    dexterity,
    constitution,
    presence,
    mind,
    bonusDefence,
    bonusHealth,
    bonusStamina,
    defense,
    maxHealth,
    maxStamina,
    actualHealth,
    actualStamina,
    attacks,
    resistences,
    vulnerabilites,
  ])

  useEffect(() => {
    setDefense(calcDefense(dexterity, bonusDefence))
    setMaxHealth(calcHealth(level, constitution, bonusHealth))
    setMaxStamina(calcStamina(level, presence, constitution, bonusStamina))
  }, [dexterity, level, constitution, presence, bonusDefence, bonusHealth, bonusStamina])

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
        let effectiveDamage = damage

        if (isResistent) effectiveDamage = effectiveDamage / 2
        if (isVulnerable) effectiveDamage = effectiveDamage * 2

        const next = prev - effectiveDamage
        return next <= 0 ? 0 : next
      })
    },
    [resistences, vulnerabilites]
  )

  const useStamina = useCallback((amount: number) => {
    setActualStamina(prev => (prev - amount <= 0 ? 0 : prev - amount))
  }, [])

  const levelUp = useCallback(() => {
    setLevel(prev => prev + 1)
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

  const addResistence = useCallback((resistence: DamageTypes) => {
    setResistences(prev => [...prev, resistence])
  }, [])

  const addVulnerabilite = useCallback((v: DamageTypes) => {
    setVulnerabilites(prev => [...prev, v])
  }, [])

  const changeStat = useCallback((stat: string, amount: number) => {
    switch (stat) {
      case "strength":
        setStrength(amount)
        break
      case "dexterity":
        setDexterity(amount)
        break
      case "constitution":
        setConstitution(amount)
        break
      case "mind":
        setMind(amount)
        break
      case "presence":
        setPresence(amount)
        break
    }
  }, [])

  const value: Character = {
    name,
    gender,
    image,
    cash,
    level,
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
    bonusDefence,
    bonusHealth,
    bonusStamina,
    attacks,
    resistences,
    vulnerabilites,
    changeName,
    changeGender,
    changeImage,
    changeCash,
    recover,
    takeDamage,
    useStamina,
    levelUp,
    defenseBonusUp,
    healthBonusUp,
    staminaBonusUp,
    addAttack,
    addResistence,
    addVulnerabilite,
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