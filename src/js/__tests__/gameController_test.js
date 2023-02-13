import GameController from '../GameController.js';
import GamePlay from '../GamePlay.js';
import GameStateService from '../GameStateService.js';
import localStorage from '../mocks/localStorage.js';

import Bowman from '../Characters/Bowman.js';
import PositionedCharacter from '../PositionedCharacter.js';
import Swordsman from '../Characters/Swordsman.js';
import Vampire from '../Characters/Vampire.js';
import Daemon from '../Characters/Daemon.js';

jest.mock('../mocks/localStorage.js');
const posVampire = new PositionedCharacter(new Vampire(1), 30);
const posSwordsman = new PositionedCharacter(new Swordsman(1), 1);
const posBowman = new PositionedCharacter(new Bowman(1), 24);
const posDaemon = new PositionedCharacter(new Daemon(1), 33);
const stateService = new GameStateService(localStorage);
const testCtrl = new GameController(new GamePlay(), stateService);
testCtrl.gameState.teamOnBoard.push(posBowman, posSwordsman, posVampire, posDaemon);

beforeEach(() => {
  jest.resetAllMocks();
});
test('Should genetate attack position', () => {
  testCtrl.setValidAttack('swordsman', 0);
  const result = [1, 8, 9];
  expect(testCtrl.gameState.validAttack).toEqual(result);
});

test('Should genetate move position', () => {
  testCtrl.setValidMove('magician', 0);
  const result = [1, 8, 9];
  expect(testCtrl.gameState.validAttack).toEqual(result);
});

test('Should show right characteristic for hero', () => {
  const daemon = new Daemon();
  const received = `\u{1F396}${daemon.level}\u{2694}${daemon.attack}\u{1F6E1}${daemon.defense}\u{2764}${daemon.health}`;
  const expected = '\u{1F396}1\u{2694}10\u{1F6E1}10\u{2764}50';
  expect(received).toEqual(expected);
});
