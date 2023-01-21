import Character from '../Character.js';

export default class Bowerman extends Character {
  constructor(level = 1) {
    super('Bowerman');
    this.level = level;
    this.defense = 25;
    this.attack = 25;
  }
}