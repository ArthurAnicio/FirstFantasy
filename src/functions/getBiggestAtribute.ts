import { Atribute } from "@/enums/atribute";
import { defaultAttacks } from "../../public/itens/attacks/defaultAttacks";

interface AtributeValue{
    atribute:Atribute
    value:number
}

export function getBiggestAtribute(
  str: number,
  dex: number,
  con: number,
  mind: number,
  pres: number
): Atribute {
  const attributes: AtributeValue[] = [
    { atribute: Atribute.strength, value: str },
    { atribute: Atribute.dexterity, value: dex },
    { atribute: Atribute.constitution, value: con },
    { atribute: Atribute.mind, value: mind },
    { atribute: Atribute.presence, value: pres },
  ];

  const biggest = attributes.reduce(
    (biggest, current) =>
      current.value > biggest.value ? current : biggest,
    attributes[0]
  );

  return biggest.atribute;
}