import Character from '../Character.js';

export default class Daemon extends Character {
  constructor(level = 1) {
    super(level, 'daemon');
    this.level = level;
    this.defense = 10;
    this.attack = 10;
  }
}
