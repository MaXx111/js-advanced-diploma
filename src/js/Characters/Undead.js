import Character from '../Character.js';

export default class Undead extends Character {
  constructor(level = 1) {
    super(level, 'undead');
    this.level = level;
    this.defense = 10;
    this.attack = 40;
  }
}
