import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faHandFist, 
    faWind, 
    faDumbbell, 
    faBrain, 
    faCommentDots, 
    faShield, 
    faHeart, 
    faBolt,
 } from '@fortawesome/free-solid-svg-icons'
 import { Atribute } from '@/enums/atribute'

 interface IconAtributeProps{
    atribute:Atribute
 }

export function IconAtribute(props:IconAtributeProps){
    switch(props.atribute){
        case Atribute.strength:
            return <FontAwesomeIcon icon={faHandFist}/>
        case Atribute.dexterity:
            return <FontAwesomeIcon icon={faWind}/>
        case Atribute.constitution:
            return <FontAwesomeIcon icon={faDumbbell}/>
        case Atribute.mind:
            return <FontAwesomeIcon icon={faBrain}/>
        case Atribute.presence:
            return <FontAwesomeIcon icon={faCommentDots}/>
        case Atribute.defense:
            return <FontAwesomeIcon icon={faShield}/>
        case Atribute.health:
            return <FontAwesomeIcon icon={faHeart}/>
        case Atribute.stamina:
            return <FontAwesomeIcon icon={faBolt}/>
    }
}