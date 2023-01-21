import Character from '../Character.js';

export default class ZombieCharacter extends Character {
  constructor(name, type) {
    if (type !== 'Zombie') {
      throw Error;
    }
    super(name, type);
    this.type = type;
    this.name = name;

    this.defense = 10;
    this.attack = 40;
  }
}
