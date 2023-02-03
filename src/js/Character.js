/**
 * Базовый класс, от которого наследуются классы персонажей
 * @property level - уровень персонажа, от 1 до 4
 * @property attack - показатель атаки
 * @property defence - показатель защиты
 * @property health - здоровье персонажа
 * @property type - строка с одним из допустимых значений:
 * swordsman
 * bowman
 * magician
 * daemon
 * undead
 * vampire
 */
export default class Character {
  constructor(level, type) {
    if (new.target.name === 'Character') {
      throw new Error('This is basic class!');
    }

    this.level = level;
    this.health = 50;
    this.type = type;
    // TODO: выбросите исключение, если кто-то использует "new Character()"
  }

  // levelUp() {
  //   this.level += 1;
  //   this.attack = (this.attack / 100) * 20 + this.attack;
  //   this.defense = (this.defense / 100) * 20 + this.defense;
  //   this.health = 100;
  // }

// damage(points) {
//   this.health -= points * (1 - this.defense / 100);
// }
}
