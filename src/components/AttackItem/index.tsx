import styles from "./AttackItem.module.css";
import { Attack } from "@/interfaces/attack";
import Image from "next/image";
import { usePlayer } from "@/contexts/PlayerContext";
import { IconAtribute } from "../../functions/IconAtribute";
import { Atribute } from "@/enums/atribute";
import { getDamageColor } from "@/functions/getDamageColor";
import { getDamageIcon } from "@/functions/getDamageIcon";
import { useBattle } from "@/contexts/BattleContext";

interface AttackItemProps {
    attack: Attack;
    inBattle: boolean;
    changeAction?: ()=>void
}

export function AttackItem(props: AttackItemProps) {

    const { attackingEnemy } = useBattle()
    const { strength, dexterity, constitution, mind, presence, bonusAttack, actualStamina } = usePlayer();
    const attack = props.attack;
    const inBattle = props.inBattle
    const color = getDamageColor(attack.damageType);

    function getAtribute() {
        switch (attack.atribute) {
            case Atribute.strength:
                return strength;
            case Atribute.dexterity:
                return dexterity;
            case Atribute.constitution:
                return constitution;
            case Atribute.mind:
                return mind;
            case Atribute.presence:
                return presence;
        }
    }

    function Attack(){
        if(inBattle && attack.costStamina <= actualStamina){
            attackingEnemy(attack)
            props.changeAction!()
        }
    }

    return (
        <div 
            className={styles.wraper}
            id={attack.costStamina <= actualStamina?'':styles.desable}
        >
            <div className={styles.card} onClick={Attack} >
                <Image
                    alt={attack.name}
                    src={attack.image}
                    width={100}
                    height={100}
                    style={{ margin: "0 auto" }}
                />
                <div className={styles.stamina}>
                    <p style={{ transform: "rotate(-45deg)" }}>{attack.costStamina}</p>
                </div>
            </div>
            <div className={styles.info}>
                <p style={{ color }}>{attack.name}</p>
                <p>
                    Ataque:
                    <IconAtribute atribute={attack.atribute} />
                    {getAtribute()} d20 {bonusAttack > 0 ? `+${bonusAttack}` : ""}
                </p>
                <p>
                    Dano:  <label style={{color}}>{attack.damageQuant}d{attack.damageDice} {getDamageIcon(attack.damageType)}{attack.damageType}</label>
                </p>
                <p>
                    Crítico: {attack.criticalRatio<20?`${attack.criticalRatio}-20`:20} / x{attack.criticalBonus}
                </p>
                <p>
                    Stamina:   <label style={{color:"var(--light-blue-t)"}}>{attack.costStamina}</label>
                </p>
            </div>
        </div>
    )
}