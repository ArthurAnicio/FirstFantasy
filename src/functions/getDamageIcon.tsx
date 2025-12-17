import { DamageTypes } from "@/enums/damageTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire,faEye,faSkull,faSnowflake,faBoltLightning,faHandBackFist } from "@fortawesome/free-solid-svg-icons";

export function getDamageIcon(damageType: DamageTypes) {
    switch (damageType) {
        case DamageTypes.fire:
            return <FontAwesomeIcon icon={faFire} />;
        case DamageTypes.ice:
            return <FontAwesomeIcon icon={faSnowflake} />;
        case DamageTypes.thunder:
            return <FontAwesomeIcon icon={faBoltLightning} />;
        case DamageTypes.physical:
            return <FontAwesomeIcon icon={faHandBackFist} />;
        case DamageTypes.psychic:
            return <FontAwesomeIcon icon={faEye} />;
        case DamageTypes.poison:
            return <FontAwesomeIcon icon={faSkull} />;
    }
}