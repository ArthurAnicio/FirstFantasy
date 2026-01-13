/* eslint-disable react-hooks/rules-of-hooks */
import { Attack } from "@/interfaces/attack";
import { usePlayer } from "@/contexts/PlayerContext";

export function addNewAttack(attack:Attack){

    const {addAttack, passives} = usePlayer();

    if(passives!.find(pas=>pas.id === 'pas-player-16')){
        attack.criticalBonus += 1
    }else if(passives!.find(pas=>pas.id === 'pas-player-17')){
        attack.criticalRatio -= 1
    }

    addAttack!(attack);
}