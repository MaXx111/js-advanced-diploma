export default class Character {
  constructor(type) {
    if(new.target.name === "Character"){
      throw new Error('This is basic class!')
    }
    
    this.type = type;
    this.health = 100;
  }

  levelUp() {
    this.level += 1;
    this.attack = (this.attack / 100) * 20 + this.attack;
    this.defense = (this.defense / 100) * 20 + this.defense;
    this.health = 100;
  }

  damage(points) {
    this.health -= points * (1 - this.defense / 100);
  }
}

