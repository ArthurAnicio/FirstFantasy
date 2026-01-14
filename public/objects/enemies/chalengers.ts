import { Character } from "@/interfaces/character";
import { DamageTypes } from "@/enums/damageTypes";
import { Atribute } from "@/enums/atribute";
import { EffectTypes } from "@/enums/effectTypes";

export const chalengers: Character[] = [
    {
        name: "Goblin",
        gender: "",
        image: "/images/enemies/goblin.jpg",
        xp: 50,
        level: 1,
        defense: 12,
        maxHealth: 11,
        actualHealth: 11,
        maxStamina: 8,
        actualStamina: 8,
        strength: 1,
        dexterity: 2,
        constitution: 1,
        mind: 0,
        presence: 0,
        bonusAttack: 0,
        bonusDefence: 0,
        bonusHealth: 0,
        bonusStamina: 0,
        equipedAttacks: [
            {
                id: "",
                name: "Mordida",
                image: "",
                atribute: Atribute.constitution,
                damageType: DamageTypes.physical,
                damageQuant: 1,
                damageDice: 6,
                criticalRatio: 20,
                criticalBonus: 2,
                effect: EffectTypes.stun,
                costStamina: 0
            },{
                id: "",
                name: "Arranhão",
                image: "",
                atribute: Atribute.dexterity,
                damageType: DamageTypes.physical,
                damageQuant: 2,
                damageDice: 4,
                criticalRatio: 19,
                criticalBonus: 2,
                effect: EffectTypes.none,
                costStamina: 1
            },
            {
                id: "",
                name: "Corte Peçonhento",
                image: "",
                atribute: Atribute.strength,
                damageType: DamageTypes.poison,
                damageQuant: 2,
                damageDice: 6,
                criticalRatio: 19,
                criticalBonus: 3,
                effect: EffectTypes.stun,
                costStamina: 3
            }
        ],
        attacks: [],
        resistences: [],
        vulnerabilites: [
            DamageTypes.fire
        ],
        imunites: []
    },
    {
        name: "Lobo",
        gender: "",
        image: "/images/enemies/lobo.jpg",
        xp: 50,
        level: 1,
        defense: 8,
        maxHealth: 15,
        actualHealth: 15,
        maxStamina: 10,
        actualStamina: 10,
        strength: 2,
        dexterity: 2,
        constitution: 1,
        mind: 0,
        presence: 1,
        bonusAttack: 2,
        bonusDefence: 0,
        bonusHealth: 0,
        bonusStamina: 0,
        equipedAttacks: [
            {
                id: "",
                name: "Mordida",
                image: "",
                atribute: Atribute.strength,
                damageType: DamageTypes.physical,
                damageQuant: 1,
                damageDice: 6,
                criticalRatio: 19,
                criticalBonus: 2,
                effect: EffectTypes.none,
                costStamina: 0
            },
            {
                id: "",
                name: "Garrada",
                image: "",
                atribute: Atribute.dexterity,
                damageType: DamageTypes.physical, 
                damageQuant: 3, 
                damageDice :4, 
                criticalRatio :19, 
                criticalBonus :2, 
                effect :EffectTypes.none, 
                costStamina :2
            }
        ],
        attacks:[],
        resistences:[],
        vulnerabilites:[
        ],
        imunites:[]
    },
    {
        name: "Esqueleto",
        gender: "",
        image: "/images/enemies/esqueleto.jpg",
        xp: 50,
        level: 1,
        defense: 14,
        maxHealth: 12,
        actualHealth: 12,
        maxStamina: 8,
        actualStamina: 8,
        strength: 1,
        dexterity: 3,
        constitution: 0,
        mind: 0,
        presence: 1,
        bonusAttack: 3,
        bonusDefence: 0,
        bonusHealth: 0,
        bonusStamina: 0,
        equipedAttacks: [
            {
                id: "",
                name: "Espadada",
                image: "",
                atribute: Atribute.dexterity,
                damageType: DamageTypes.physical,
                damageQuant: 1, 
                damageDice :6, 
                criticalRatio :20, 
                criticalBonus :2, 
                effect :EffectTypes.none, 
                costStamina :0
            },
            {
                id: "",
                name: "Podridão",
                image: "",
                atribute:Atribute.dexterity, 
                damageType :DamageTypes.poison, 
                damageQuant :2, 
                damageDice :6, 
                criticalRatio :19, 
                criticalBonus :2, 
                effect :EffectTypes.none, 
                costStamina :4
            }
        ],
        attacks:[],
        resistences:[],
        vulnerabilites:[
            DamageTypes.physical
        ],
        imunites:[
            DamageTypes.poison
        ]
    }
]