import { IMonster } from "../interfaces/monster.interface";
import { MonsterType } from "../utils/monster.utils";

export class Monster implements IMonster {

    id: number = -1;
    name: string = "My monster";
    hp: number = 40;
    image: string = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png";
    figureCaption: string = "N°001 Monster";
    attackName: string = "Geo Impact";
    attackStrength: number = 60;
    attackDescription: string = "This is a long description";
    type: MonsterType = MonsterType.ELECTRIC;

    copy(): Monster {
        return Object.assign(new Monster(), this)
    }

    static fromJson(monsterJson: IMonster): Monster {
        return Object.assign(new Monster(), monsterJson)
    }

    toJson(): IMonster {
        const monsterJson: IMonster = Object.assign({}, this);
        delete monsterJson.id;
        return monsterJson;
    }

}