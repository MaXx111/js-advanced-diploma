import Character from '../Character.js';

export default class Bowman extends Character {
  constructor(level = 1) {
    super(level, 'bowman');
    this.level = level;
    this.defense = 25;
    this.attack = 25;
  }
}
