import Character from '../Character.js';

export default class Swordsman extends Character {
  constructor(level = 1) {
    super(level, 'swordsman');
    this.level = level;
    this.defense = 10;
    this.attack = 40;
  }
}
