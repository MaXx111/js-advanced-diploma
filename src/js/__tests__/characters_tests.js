import Character from '../Character.js';
import Bowman from '../Characters/Bowman.js';
import Daemon from '../Characters/Daemon.js';
import Magician from '../Characters/Magician.js';
import Swordsman from '../Characters/Swordsman.js';
import Undead from '../Characters/Undead.js';
import Vampire from '../Characters/Vampire.js';

test('Should throw error', () => {
  expect(() => new Character('к', 'Daemon')).toThrow();
});

test('Should get right characteristic for Bowman', () => {
  const result = new Bowman();
  const expct = {
    health: 50, level: 1, type: 'bowman', attack: 25, defense: 25,
  };
  expect(result).toEqual(expct);
});

test('Should get right characteristic for Daemon', () => {
  const result = new Daemon();
  const expct = {
    health: 50, level: 1, type: 'daemon', attack: 10, defense: 10,
  };
  expect(result).toEqual(expct);
});

test('Should get right characteristic for Magician', () => {
  const result = new Magician();
  const expct = {
    health: 50, level: 1, type: 'magician', attack: 10, defense: 40,
  };
  expect(result).toEqual(expct);
});

test('Should get right characteristic for Swordsman', () => {
  const result = new Swordsman();
  const expct = {
    health: 50, level: 1, type: 'swordsman', attack: 40, defense: 10,
  };
  expect(result).toEqual(expct);
});

test('Should get right characteristic for Undead', () => {
  const result = new Undead();
  const expct = {
    health: 50, level: 1, type: 'undead', attack: 40, defense: 10,
  };
  expect(result).toEqual(expct);
});

test('Should get right characteristic for Vampire', () => {
  const result = new Vampire();
  const expct = {
    health: 50, level: 1, type: 'vampire', attack: 25, defense: 25,
  };
  expect(result).toEqual(expct);
});
