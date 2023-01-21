import Character from '../Character.js';

export default class Zombie extends Character {
  constructor(level = 1) {
    super('Zombie');
    this.level = level;
    this.defense = 10;
    this.attack = 40;
  }
}
