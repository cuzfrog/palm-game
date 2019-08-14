import { Tetromino } from 'src/store/games/tetris-tetromino';
import { Orientation } from 'src/domain';

describe('tetromino', () => {
  const MAX_X = Tetromino._MAX_X;
  const I_v = Tetromino._create('I', Orientation.UP, MAX_X - 3, 15);
  const I_h = Tetromino._create('I', Orientation.RIGHT, MAX_X - 2, 15);
  it('move right', () => {
    expect(I_v.moveRight()._x).toBe(MAX_X - 2);
    expect(I_h.moveRight()._x).toBe(I_h._x);
  });
});
