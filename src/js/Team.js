/**
 * Класс, представляющий персонажей команды
 *
 * @todo Самостоятельно продумайте хранение персонажей в классе
 * Например
 * @example
 * ```js
 * const characters = [new Swordsman(2), new Bowman(1)]
 * const team = new Team(characters);
 *
 * team.characters // [swordsman, bowman]
 * ```
 * */
export default class Team {
  // TODO: write your logic here
  constructor(arr) {
    this.characters = [];
    this.addAll(arr);
  }

  addAll(arr) {
    for (let i = 0; i < arr.length; i += 1) {
      this.characters.push(arr[i]);
    }
  }
}
