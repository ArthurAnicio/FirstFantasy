import { BonusTypes } from "@/enums/bonusTypes";
import { DamageTypes } from "@/enums/damageTypes";
import { Passives } from "@/interfaces/passives";

export const passivesPlayer:Passives[] = [
    {
        id:'pas-player-1',
        name:"Perito",
        image:"/images/passives/perito.png",
        description:"+5 em bonus de ataque",
        typeBonus: BonusTypes.bonusAttack,
        bonusNum: 5,
        price: 5
    },
    {
        id:'pas-player-2',
        name:"Casca Grossa",
        image:"/images/passives/resistenciaFisica.png",
        description:"Consede resistencia a dano fisico",
        typeBonus: BonusTypes.resistence,
        bonusDamageType: DamageTypes.physical,
        price: 5
    },
    {
        id:'pas-player-3',
        name:"Mente Forte",
        image:"/images/passives/resistenciaPsiquico.png",
        description:"Consede resistencia a dano psiquico",
        typeBonus: BonusTypes.resistence,
        bonusDamageType: DamageTypes.psychic,
        price: 5
    },
    {
        id:'pas-player-4',
        name:"Pele Chamuscada",
        image:"/images/passives/resistenciaFogo.png",
        description:"Consede resistencia a dano de fogo",
        typeBonus: BonusTypes.resistence,
        bonusDamageType: DamageTypes.fire,
        price: 5
    },
    {
        id:'pas-player-5',
        name:"Pele Isolante",
        image:"/images/passives/resistenciaTrovao.png",
        description:"Consede resistencia a dano de trovao",
        typeBonus: BonusTypes.resistence,
        bonusDamageType: DamageTypes.thunder,
        price: 5
    },
    {
        id:'pas-player-6',
        name:"Pele Aquecida",
        image:"/images/passives/resistenciaFrio.png",
        description:"Consede resistencia a dano de frio",
        typeBonus: BonusTypes.resistence,
        bonusDamageType: DamageTypes.ice,
        price: 5
    },
    {
        id:'pas-player-7',
        name:'Pele Corrosiva',
        image:"/images/passives/resistenciaVeneno.png",
        description:"Consede resistencia a dano venenoso",
        typeBonus: BonusTypes.resistence,
        bonusDamageType: DamageTypes.poison,
        price: 5
    }
]