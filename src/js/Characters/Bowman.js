import Character from '../Character.js';

export default class Bowman extends Character {
  constructor(level = 1) {
    super(level, 'bowman');
    this.level = level;
    this.defense = 25;
    this.attack = 25;
    this.levelUp();
  }

  levelUp() {
    for (let i = 1; i <= this.level; i += 1) {
      if (this.level !== 1) {
        this.attack = Math.round(Math.max(this.attack, this.attack * (80 + this.health) / 100));
        this.defense = Math.round(Math.max(this.defense, this.defense * (80 + this.health) / 100));
      }
    }
  }
}
