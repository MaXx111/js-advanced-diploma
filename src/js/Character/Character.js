export default class Character {
  constructor(name, type) {
    if (name.length < 2) {
      throw new Error('Имя должно быть от 2 символов');
    } else if (name.length > 10) {
      throw new Error('Имя должно быть до 10 символов');
    }

    const arrayOfTypes = ['Bowerman', 'Swordsman', 'Magician', 'Daemon', 'Undead', 'Zombie'];
    if (!arrayOfTypes.includes(type)) {
      throw new Error('Такого класса нет');
    }

    this.name = name;
    this.type = type;
    this.health = 100;
    this.level = 1;
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
