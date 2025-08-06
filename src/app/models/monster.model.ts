import { MonsterType } from "../utils/monster.utils";

export class Monster {

    id: number = -1;
    name: string = "My monster";
    hp: number = 40;
    figureCaption: string = "N°001 Monster";
    attackName: string = "Geo Impact";
    attackStrength: number = 60;
    attackDescription: string = "This is a long description";
    image: string = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png";
    type: MonsterType = MonsterType.ELECTRIC;

    copy(): Monster {
        return Object.assign(new Monster(), this)
    }

}