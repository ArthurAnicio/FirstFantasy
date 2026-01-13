import { Atribute } from "@/enums/atribute";
import { DamageTypes } from "@/enums/damageTypes";
import { EffectTypes } from "@/enums/effectTypes";
import { Attack } from "@/interfaces/attack";

interface shopAttack{
    attack:Attack
    price:number
}

export const shopAttacks:shopAttack[] =[
    {
        attack:{
            id: "shop-atk-001",
            name: "Machadada",
            image: "/images/attacks/shop/machadada.png",
            atribute: Atribute.strength,
            damageType: DamageTypes.physical,
            damageQuant: 1,
            damageDice: 12,
            criticalRatio: 19,
            criticalBonus: 3,
            effect: EffectTypes.none,
            costStamina: 1
        },
        price:1
    },
    {
        attack:{
            id: "shop-atk-002",
            name: "Flecha Flamejante",
            image: "/images/attacks/shop/flechaFlamejante.png",
            atribute: Atribute.dexterity,
            damageType: DamageTypes.fire,
            damageQuant: 3,
            damageDice: 6,
            criticalRatio: 20,
            criticalBonus: 2,
            effect: EffectTypes.burn,
            costStamina: 2
        },
        price:1
    },
    {
        attack:{
            id: "shop-atk-003",
            name: "Nuvem de veneno",
            image: "/images/attacks/shop/nuvemVeneno.png",
            atribute: Atribute.constitution,
            damageType: DamageTypes.poison,
            damageQuant: 4,
            damageDice: 4,
            criticalRatio: 20,
            criticalBonus: 3,
            effect: EffectTypes.weak,
            costStamina: 2
        },
        price:1
    },
    {
        attack:{
            id: "shop-atk-004",
            name: "Raio Congelante",
            image: "/images/attacks/shop/raioCongelante.png",
            atribute: Atribute.mind,
            damageType: DamageTypes.ice,
            damageQuant: 2,
            damageDice: 8,
            criticalRatio: 20,
            criticalBonus: 2,
            effect: EffectTypes.slow,
            costStamina: 2
        },
        price:1
    },
    {
        attack:{
            id: "shop-atk-005",
            name: "Sinfonia Psíquica",
            image: "/images/attacks/shop/sinfoniaPsiquica.png",
            atribute: Atribute.presence,
            damageType: DamageTypes.psychic,
            damageQuant: 2,
            damageDice: 10,
            criticalRatio: 20,
            criticalBonus: 4,
            effect: EffectTypes.stun,
            costStamina: 3
        },
        price:2,

    },
    {
        attack:{
            id: "shop-atk-006",
            name: "Impacto Glacial",
            image: "/images/attacks/shop/impactoGlacial.png",
            atribute: Atribute.strength,
            damageType: DamageTypes.ice,
            damageQuant: 2,
            damageDice: 8,
            criticalRatio: 20,
            criticalBonus: 2,
            effect: EffectTypes.slow,
            costStamina: 2
        },
        price:1
    },
    {
        attack:{
            id: "shop-atk-007",
            name: "Corte Peçonhento",
            image: "/images/attacks/shop/cortePeconhento.png",
            atribute: Atribute.dexterity,
            damageType: DamageTypes.poison,
            damageQuant: 2,
            damageDice: 8,
            criticalRatio: 20,
            criticalBonus: 3,
            effect: EffectTypes.weak,
            costStamina: 2
        },
        price:1
    },
    {
        attack:{
            id: "shop-atk-008",
            name: "Combustão Expontânea",
            image: "/images/attacks/shop/combustaoExpontanea.png",
            atribute: Atribute.constitution,
            damageType: DamageTypes.fire,
            damageQuant: 4,
            damageDice: 6,
            criticalRatio: 20,
            criticalBonus: 4,
            effect: EffectTypes.burn,
            costStamina: 2
        },
        price:1
    },
    {
        attack:{
            id: "shop-atk-009",
            name: "ZipZap",
            image: "/images/attacks/shop/zipZap.png",
            atribute: Atribute.presence,
            damageType: DamageTypes.thunder,
            damageQuant: 2,
            damageDice: 10,
            criticalRatio: 19,
            criticalBonus: 2,
            effect: EffectTypes.stun,
            costStamina: 3
        },
        price:1
    },{
        attack:{
            id: "shop-atk-010",
            name: "Impácto mágico",
            image: "/images/attacks/shop/impactoMagico.png",
            atribute: Atribute.mind,
            damageType: DamageTypes.physical,
            damageQuant: 2,
            damageDice: 6,
            criticalRatio: 20,
            criticalBonus: 2,
            effect: EffectTypes.stun,
            costStamina: 3
        },
        price:1
    }
]