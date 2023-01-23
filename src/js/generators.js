import Team from './Team.js';

/**
 * Формирует экземпляр персонажа из массива allowedTypes со
 * случайным уровнем от 1 до maxLevel
 *
 * @param allowedTypes массив классов
 * @param maxLevel максимальный возможный уровень персонажа
 * @returns генератор, который при каждом вызове
 * возвращает новый экземпляр класса персонажа
 *
 */
export function* characterGenerator(allowedTypes, maxLevel) {
  // TODO: write logic here
  while (true) {
    const randomTypeCount = Math.floor(Math.random() * allowedTypes.length);
    let randomLevelCount = Math.round(Math.random() * maxLevel);

    if (randomLevelCount === 0) {
      randomLevelCount = 1;
    }
    yield new allowedTypes[randomTypeCount](randomLevelCount);
  }
}

/**
 * Формирует массив персонажей на основе characterGenerator
 * @param allowedTypes массив классов
 * @param maxLevel максимальный возможный уровень персонажа
 * @param characterCount количество персонажей, которое нужно сформировать
 * @returns экземпляр Team, хранящий экземпляры персонажей.
 * Количество персонажей в команде - characterCount
 * */
export function generateTeam(allowedTypes, maxLevel, characterCount) {
  // TODO: write logic here
  const characters = [];
  const generator = characterGenerator(allowedTypes, maxLevel);

  for (let i = 1; i <= characterCount; i += 1) {
    characters.push(generator.next().value);
  }
  return new Team(characters);
}

