import { characterGenerator, generateTeam } from '../generators.js';

import Bowman from '../Characters/Bowman.js';
import Magician from '../Characters/Magician.js';
import Swordsman from '../Characters/Swordsman.js';

test('Should genetate classes', () => {
  const result = [];
  const allowedTypes = [Bowman, Magician, Swordsman];
  const generator = characterGenerator(allowedTypes, 3);
  result.push(generator.next());
  result.push(generator.next());
  result.push(generator.next());
  result.push(generator.next());
  result.push(generator.next());
  expect(result.length).toEqual(5);
});

test('Should genetate team', () => {
  const allowedTypes = [Bowman, Magician, Swordsman];
  let result;
  const generator = generateTeam(allowedTypes, 3, 20);
  for (const item of generator.characters) {
    if (item.level === 3) {
      result = true;
    }
  }
  expect(result).toEqual(true);
});
