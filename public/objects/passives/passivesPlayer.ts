import { Atribute } from "@/enums/atribute";
import { BonusTypes } from "@/enums/bonusTypes";
import { DamageTypes } from "@/enums/damageTypes";
import { Passives } from "@/interfaces/passives";

export const passivesPlayer:Passives[] = [
    {
        id:'pas-player-1',
        name:"Combate Treinado",
        image:"/images/passives/perito.png",
        description:"+5 em bonus de ataque",
        typeBonus: BonusTypes.bonusAttack,
        bonusNum: 5,
        bonusDamageType: DamageTypes.none,
        bonusStat: Atribute.none,
        price: 5
    },
    {
        id:'pas-player-2',
        name:"Preparado",
        image:"/images/passives/preparado.jpg",
        description:"+5 em bonus de defesa",
        typeBonus: BonusTypes.bonusDefense,
        bonusNum: 5,
        bonusDamageType: DamageTypes.none,
        bonusStat: Atribute.none,
        price: 5
    },
    {
        id:'pas-player-3',
        name:"Saudável",
        image:"/images/passives/saudavel.jpg",
        description:"+5 pontos de vida máxima",
        typeBonus: BonusTypes.bonusHp,
        bonusNum: 5,
        bonusDamageType: DamageTypes.none,
        bonusStat: Atribute.none,
        price: 5
    },
    {
        id:'pas-player-4',
        name:"Energético",
        image:"/images/passives/energetico.jpg",
        description:"+5 pontos de stamina máxima",
        typeBonus: BonusTypes.bonusStamina,
        bonusNum: 5,
        bonusDamageType: DamageTypes.none,
        bonusStat: Atribute.none,
        price: 5
    },
    {
        id:'pas-player-5',
        name:"Casca Grossa",
        image:"/images/passives/resistenciaFisica.png",
        description:"Consede resistencia a dano fisico",
        typeBonus: BonusTypes.resistence,
        bonusDamageType: DamageTypes.physical,
        bonusNum: 0,
        bonusStat: Atribute.none,
        price: 10
    },
    {
        id:'pas-player-6',
        name:"Mente Forte",
        image:"/images/passives/resistenciaPsiquico.png",
        description:"Consede resistencia a dano psiquico",
        typeBonus: BonusTypes.resistence,
        bonusDamageType: DamageTypes.psychic,
        bonusNum: 0,
        bonusStat: Atribute.none,
        price: 10
    },
    {
        id:'pas-player-7',
        name:"Pele Chamuscada",
        image:"/images/passives/resistenciaFogo.png",
        description:"Consede resistencia a dano de fogo",
        typeBonus: BonusTypes.resistence,
        bonusDamageType: DamageTypes.fire,
        bonusNum: 0,
        bonusStat: Atribute.none,
        price: 10
    },
    {
        id:'pas-player-8',
        name:"Pele Isolante",
        image:"/images/passives/resistenciaTrovao.png",
        description:"Consede resistencia a dano de trovao",
        typeBonus: BonusTypes.resistence,
        bonusDamageType: DamageTypes.thunder,
        bonusNum: 0,
        bonusStat: Atribute.none,
        price: 10
    },
    {
        id:'pas-player-9',
        name:"Pele Aquecida",
        image:"/images/passives/resistenciaFrio.png",
        description:"Consede resistencia a dano de frio",
        typeBonus: BonusTypes.resistence,
        bonusDamageType: DamageTypes.ice,
        bonusNum: 0,
        bonusStat: Atribute.none,
        price: 10
    },
    {
        id:'pas-player-10',
        name:'Pele Corrosiva',
        image:"/images/passives/resistenciaVeneno.png",
        description:"Consede resistencia a dano venenoso",
        typeBonus: BonusTypes.resistence,
        bonusDamageType: DamageTypes.poison,
        bonusNum: 0,
        bonusStat: Atribute.none,
        price: 10
    },
    {
        id:'pas-player-11',
        name:"Fortificado",
        image:"/images/passives/Fortificado.jpg",
        description:"+1 no atributo de força",
        typeBonus: BonusTypes.bonusStat,
        bonusStat: Atribute.strength,
        bonusDamageType: DamageTypes.none,
        bonusNum: 0,
        price: 10
    },
    {
        id:'pas-player-12',
        name:"Agil",
        image:"/images/passives/agil.jpg",
        description:"+1 no atributo de destreza",
        typeBonus: BonusTypes.bonusStat,
        bonusStat: Atribute.dexterity,
        bonusDamageType: DamageTypes.none,
        bonusNum: 0,
        price: 10
    },
    {
        id:'pas-player-13',
        name:"Resiliente",
        image:"/images/passives/resiliente.jpg",
        description:"+1 no atributo de constituição",
        typeBonus: BonusTypes.bonusStat,
        bonusStat: Atribute.constitution,
        bonusDamageType: DamageTypes.none,
        bonusNum: 0,
        price: 10
    },
    {
        id:'pas-player-14',
        name:"Inteligente",
        image:"/images/passives/inteligente.jpg",
        description:"+1 no atributo de mente",
        typeBonus: BonusTypes.bonusStat,
        bonusStat: Atribute.mind,
        bonusDamageType: DamageTypes.none,
        bonusNum: 0,
        price: 10
    },
    {
        id:'pas-player-15',
        name:"Perspicaz",
        image:"/images/passives/perspicaz.jpg",
        description:"+1 no atributo de presença",
        typeBonus: BonusTypes.bonusStat,
        bonusStat: Atribute.presence,
        bonusDamageType: DamageTypes.none,
        bonusNum: 0,
        price: 10
    },
    {
        id:'pas-player-16',
        name:"Letal",
        image:"/images/passives/letal.png",
        description:"Aumenta em 1 o multiplicador de dano crítico de seus ataques",
        typeBonus: BonusTypes.bonusCriticalDamage,
        bonusNum: 1,
        bonusDamageType: DamageTypes.none,
        bonusStat: Atribute.none,
        price: 15
    },
    {
        id:'pas-player-17',
        name:"Perigoso",
        image:"/images/passives/perigoso.png",
        description:"Aumenta em 1 a margem de critico de seus ataques",
        typeBonus: BonusTypes.bonusCriticalRatio,
        bonusNum: 1,
        bonusDamageType: DamageTypes.none,
        bonusStat: Atribute.none,
        price: 15
    },
    {
        id:'pas-player-18',
        name:"Intocável",
        image:"/images/passives/imunidadeFisica.png",
        description:"Recebe imunidade a dano físico",
        typeBonus: BonusTypes.imunite,
        bonusNum: 1,
        bonusDamageType: DamageTypes.physical,
        bonusStat: Atribute.none,
        price: 50
    },
    {
        id:'pas-player-19',
        name:"Inabalável",
        image:"/images/passives/imunidadePsiquico.png",
        description:"Recebe imunidade a dano psiquico",
        typeBonus: BonusTypes.imunite,
        bonusNum: 1,
        bonusDamageType: DamageTypes.psychic,
        bonusStat: Atribute.none,
        price: 50
    },
    {
        id:'pas-player-20',
        name:"Flamejante",
        image:"/images/passives/imunidadeFogo.png",
        description:"Recebe imunidade a dano de fogo",
        typeBonus: BonusTypes.imunite,
        bonusNum: 1,
        bonusDamageType: DamageTypes.fire,
        bonusStat: Atribute.none,
        price: 50
    },
    {
        id:'pas-player-21',
        name:"Trovejante",
        image:"/images/passives/imunidadeTrovao.png",
        description:"Recebe imunidade a dano de trovão",
        typeBonus: BonusTypes.imunite,
        bonusNum: 1,
        bonusDamageType: DamageTypes.thunder,
        bonusStat: Atribute.none,
        price: 50
    },
    {
        id:'pas-player-22',
        name:"Ártiico",
        image:"/images/passives/imunidadeFrio.png",
        description:"Recebe imunidade a dano de frio",
        typeBonus: BonusTypes.imunite,
        bonusNum: 1,
        bonusDamageType: DamageTypes.ice,
        bonusStat: Atribute.none,
        price: 50
    },
    {
        id:'pas-player-23',
        name:"Tóxico",
        image:"/images/passives/imunidadeVeneno.png",
        description:"Recebe imunidade a dano venenoso",
        typeBonus: BonusTypes.imunite,
        bonusNum: 1,
        bonusDamageType: DamageTypes.poison,
        bonusStat: Atribute.none,
        price: 50
    },
]