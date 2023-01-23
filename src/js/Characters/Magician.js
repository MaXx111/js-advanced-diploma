import Character from '../Character.js';

export default class Magician extends Character {
  constructor(level = 1) {
    super(level, 'magician');
    this.level = level;
    this.defense = 40;
    this.attack = 10;
  }
}
