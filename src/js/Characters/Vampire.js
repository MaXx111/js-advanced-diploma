import Character from '../Character.js';

export default class Vampire extends Character {
  constructor(level = 1) {
    super(level, 'vampire');
    this.level = level;
    this.defense = 25;
    this.attack = 25;
  }
}
