import Character from '../Character.js';

export default class Undead extends Character {
  constructor(level = 1) {
    super(level, 'undead');
    this.level = level;
    this.defense = 10;
    this.attack = 40;
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
