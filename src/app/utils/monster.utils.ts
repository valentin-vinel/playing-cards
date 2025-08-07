export enum MonsterType {
	PLANT = 'Plante',
	ELECTRIC = 'Électrik',
	FIRE = 'Feu',
	WATER = 'Eau',
}

export interface IMonsterProperties {
	imageUrl: string;
	color: string;
}

export const MonsterTypeProperties: {[key: string]: IMonsterProperties} = {
	[MonsterType.PLANT]: {
		imageUrl: 'https://static.wikia.nocookie.net/pokemongo/images/c/c5/Grass.png',
		color: 'rgba(135, 255, 124)'
	},
	[MonsterType.ELECTRIC]: {
		imageUrl: 'https://static.wikia.nocookie.net/pokemongo/images/2/2f/Electric.png',
		color: 'rgb(255, 255, 104)'
	},
	[MonsterType.FIRE]: {
		imageUrl: 'https://static.wikia.nocookie.net/pokemongo/images/3/30/Fire.png',
		color: 'rgb(255, 104, 104)'
	},
	[MonsterType.WATER]: {
		imageUrl: 'https://static.wikia.nocookie.net/pokemongo/images/9/9d/Water.png',
		color: 'rgba(118, 234, 255)'
	},
}