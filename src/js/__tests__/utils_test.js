import { calcTileType } from '../utils.js';

test.each([
  ['someting', { index: 0, boardSize: 8 }, 'top-left'],
  ['someting', { index: 1, boardSize: 8 }, 'top'],
  ['someting', { index: 8, boardSize: 8 }, 'left'],
  ['someting', { index: 44, boardSize: 8 }, 'center'],
  ['someting', { index: 7, boardSize: 8 }, 'top-right'],
  ['someting', { index: 15, boardSize: 8 }, 'right'],
  ['someting', { index: 63, boardSize: 8 }, 'bottom-right'],
  ['someting', { index: 56, boardSize: 8 }, 'bottom-left'],
  ['someting', { index: 58, boardSize: 8 }, 'bottom'],
])(
  ('Should get right line of board'),
  (something, amount, expected) => {
    const result = calcTileType(amount.index, amount.boardSize);
    expect(result).toEqual(expected);
  },
);
