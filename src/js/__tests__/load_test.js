import GameStateService from '../GameStateService.js';

test('Should throw error', () => {
  expect(() => {
    const stateService = new GameStateService(null);
    stateService.load();
  }).toThrow();
});
