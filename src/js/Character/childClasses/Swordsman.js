import Character from '../Character.js';

export default class SwordsmanCharacter extends Character {
  constructor(name, type) {
    if (type !== 'Swordsman') {
      throw Error;
    }
    super(name, type);
    this.type = type;
    this.name = name;

    this.defense = 10;
    this.attack = 40;
  }
}
