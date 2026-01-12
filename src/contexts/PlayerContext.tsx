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
import { Character } from "@/interfaces/character"
import { Passives } from "@/interfaces/passives"

const PlayerContext = createContext<Character | undefined>(undefined)

const defaultPlayer: Character = {
  name: "",
  gender: "",
  image: "",
  xp: 0,
  level: 1,
  cash: 0,
  atributePoints: 0,
  technicalPoints: 0,
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
  passives: [],
  resistences: [],
  vulnerabilites: [],
  imunites: [],
}

function loadPlayer(): Character {
  if (typeof window === "undefined") return defaultPlayer

  try {
    const raw = Cookies.get("player")
    if (!raw) return defaultPlayer
    const parsed = JSON.parse(raw)
    return { ...defaultPlayer, ...parsed }
  } catch {
    return defaultPlayer
  }
}

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const loadedPlayer = loadPlayer()
  
  const isNewPlayer = !loadedPlayer.name || loadedPlayer.name === ""
  
  const initialMaxHealth = calcHealth(loadedPlayer.level ?? 1, loadedPlayer.constitution ?? 0, loadedPlayer.bonusHealth ?? 0)
  const initialActualHealth = isNewPlayer 
    ? initialMaxHealth 
    : Math.min(loadedPlayer.actualHealth ?? 0, initialMaxHealth)
    
  const initialMaxStamina = calcStamina(
    loadedPlayer.level ?? 1, 
    loadedPlayer.presence ?? 0, 
    loadedPlayer.constitution ?? 0, 
    loadedPlayer.bonusStamina ?? 0
  )
  const initialActualStamina = isNewPlayer 
    ? initialMaxStamina 
    : Math.min(loadedPlayer.actualStamina ?? 0, initialMaxStamina)

  const [name, setName] = useState(loadedPlayer.name)
  const [gender, setGender] = useState(loadedPlayer.gender)
  const [image, setImage] = useState(loadedPlayer.image)
  const [xp, setXpState] = useState(loadedPlayer.xp ?? 0)
  const [level, setLevel] = useState(
    loadedPlayer.level ?? levelFromXp(loadedPlayer.xp ?? 0),
  )

  const [cash, setCash] = useState(loadedPlayer.cash ?? 0)
  const [atributePoints, setAtributePoints] = useState(
    loadedPlayer.atributePoints ?? 0,
  )
  
const [technicalPoints, setTechnicalPoints] = useState(
  loadedPlayer.technicalPoints ?? 0,
)

  const [strength, setStrength] = useState(loadedPlayer.strength ?? 0)
  const [dexterity, setDexterity] = useState(loadedPlayer.dexterity ?? 0)
  const [constitution, setConstitution] = useState(loadedPlayer.constitution ?? 0)
  const [presence, setPresence] = useState(loadedPlayer.presence ?? 0)
  const [mind, setMind] = useState(loadedPlayer.mind ?? 0)
  const [bonusAttack, setBonusAttack] = useState(loadedPlayer.bonusAttack ?? 0)
  const [bonusDefence, setBonusDefence] = useState(loadedPlayer.bonusDefence ?? 0)
  const [bonusHealth, setBonusHealth] = useState(loadedPlayer.bonusHealth ?? 0)
  const [bonusStamina, setBonusStamina] = useState(loadedPlayer.bonusStamina ?? 0)

  const [defense, setDefense] = useState(
    calcDefense(loadedPlayer.dexterity ?? 0, loadedPlayer.bonusDefence ?? 0),
  )
  const [maxHealth, setMaxHealth] = useState(initialMaxHealth)
  const [actualHealth, setActualHealth] = useState(initialActualHealth)
  const [maxStamina, setMaxStamina] = useState(initialMaxStamina)
  const [actualStamina, setActualStamina] = useState(initialActualStamina)

  const [attacks, setAttacks] = useState(loadedPlayer.attacks ?? [])
  const [equipedAttacks, setEquipedAttacks] = useState(
    loadedPlayer.equipedAttacks ?? [],
  )
  const [passives, setPassives] = useState(loadedPlayer.passives ?? [])
  const [resistences, setResistences] = useState(
    loadedPlayer.resistences ?? [],
  )
  const [vulnerabilites, setVulnerabilites] = useState(
    loadedPlayer.vulnerabilites ?? [],
  )
  const [imunites, setImunites] = useState(loadedPlayer.imunites ?? [])

  useEffect(() => {
    setLevel(levelFromXp(xp))
  }, [xp])

  useEffect(() => {
    setDefense(calcDefense(dexterity, bonusDefence))
    
    const newMaxHealth = calcHealth(level, constitution, bonusHealth)
    setMaxHealth(newMaxHealth)
    
    const newMaxStamina = calcStamina(level, presence, constitution, bonusStamina)
    setMaxStamina(newMaxStamina)
  }, [dexterity, level, constitution, presence, bonusDefence, bonusHealth, bonusStamina])

  useEffect(() => {
    const playerToSave: Character = {
      name,
      gender,
      image,
      xp,
      level,
      cash,
      atributePoints,
      technicalPoints,
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
      passives,
      resistences,
      vulnerabilites,
      imunites,
    }

    Cookies.set("player", JSON.stringify(playerToSave), {
      expires: 365 * 20,
    })
  }, [name, gender, image, xp, level, cash, atributePoints, strength, dexterity, constitution, presence, mind, bonusAttack, bonusDefence, bonusHealth, bonusStamina, defense, maxHealth, maxStamina, actualHealth, actualStamina, attacks, equipedAttacks, passives, resistences, vulnerabilites, imunites, technicalPoints])

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

  const changeAtributePoints = useCallback((amount: number) => {
    setAtributePoints(amount)
  }, [])

  const changeTechnicalPoints = useCallback((amount: number) => {
    setTechnicalPoints(amount)
  }, [])
  
  const changeActualHealth = (amount: number) => {
    setActualHealth(amount)
  }
  
  const changeActualStamina = (amount: number) => {
    setActualStamina(amount)
  }

  const setXp = useCallback((amount: number) => {
    setXpState(amount)
  }, [])

  const addXp = useCallback((amount: number) => {
    setXpState(prev => Math.max(0, prev + amount))
  }, [])

  const recover = useCallback(
    (stat: string, amount: number) => {
      if (stat === "health") {
        setActualHealth(prev =>
          prev + amount >= maxHealth ? maxHealth : prev + amount,
        )
      } else {
        setActualStamina(prev =>
          prev + amount >= maxStamina ? maxStamina : prev + amount,
        )
      }
    },
    [maxHealth, maxStamina],
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
    [resistences, vulnerabilites, imunites],
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

  const addPassive = useCallback((passive: Passives) => {
    setPassives(prev => [...prev, passive])
  }, [])

  const unequipAttack = useCallback((attack: Attack) => {
    setEquipedAttacks(prev => prev.filter(a => a.name !== attack.name))
  }, [])

  const removeAttack = useCallback((attack: Attack) => {
    setAttacks(prev => prev.filter(a => a.name !== attack.name))
  }, [])

  const removePassive = useCallback((passive: Passives) => {
    setPassives(prev => prev.filter(p => p.name !== passive.name))
  }, [])

  const addResistence = useCallback((resistence: DamageTypes) => {
    setResistences(prev => [...prev, resistence])
  }, [])

  const removeResistence = useCallback((resistence: DamageTypes) => {
    setResistences(prev => prev.filter(r => r !== resistence))
  }, [])

  const addVulnerabilite = useCallback((v: DamageTypes) => {
    setVulnerabilites(prev => [...prev, v])
  }, [])

  const removeVulnerabilite = useCallback((vulnerabilite: DamageTypes) => {
    setVulnerabilites(prev => prev.filter(v => v !== vulnerabilite))
  }, [])

  const addImunite = useCallback((v: DamageTypes) => {
    setImunites(prev => [...prev, v])
  }, [])

  const removeImunite = useCallback((imunite: DamageTypes) => {
    setImunites(prev => prev.filter(i => i !== imunite))
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

  const resetPlayer = useCallback(() => {
    Cookies.remove("player")
  }, [])

  const value: Character = {
    name,
    gender,
    image,
    xp,
    level,
    cash,
    atributePoints,
    technicalPoints,
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
    passives,
    resistences,
    vulnerabilites,
    imunites,
    changeName,
    changeGender,
    changeImage,
    changeCash,
    changeAtributePoints,
    changeActualHealth,
    changeActualStamina,
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
    addPassive,
    unequipAttack,
    addResistence,
    addVulnerabilite,
    addImunite,
    changeStat,
    removeAttack,
    removeImunite,
    removePassive,
    removeResistence,
    removeVulnerabilite,
    resetPlayer
  }

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  const ctx = useContext(PlayerContext)
  if (!ctx) throw new Error("usePlayer deve estar dentro de PlayerProvider")
  return ctx
}
