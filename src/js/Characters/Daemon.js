import Character from '../Character.js';

export default class Daemon extends Character {
  constructor(level = 1) {
    super(level, 'daemon');
    this.level = level;
    this.defense = 10;
    this.attack = 10;
    this.levelUp();
  }

  levelUp() {
    for (let i = 1; i <= this.level; i += 1) {
      if (this.level !== 1) {
        this.attack = Math.max(this.attack, this.attack * (80 + this.health) / 100);
        this.defense = Math.max(this.defense, this.defense * (80 + this.health) / 100);
      }
    }
  }
}
