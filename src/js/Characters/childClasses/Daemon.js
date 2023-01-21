import Character from '../Character.js';

export default class Daemon extends Character {
  constructor(level = 1) {
    super('Daemon');
    this.level = level;
    this.defense = 40;
    this.attack = 10;
  }
}
