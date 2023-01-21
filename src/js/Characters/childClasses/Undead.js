import Character from '../Character.js';

export default class Undead extends Character {
  constructor(level = 1) {
    super('Undead');
    this.level = level;
    this.defense = 25;
    this.attack = 25;
  }
}
