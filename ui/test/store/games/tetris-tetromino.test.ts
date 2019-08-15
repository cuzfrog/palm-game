import { Tetromino } from 'src/store/games/tetris-tetromino';
import { Orientation, Point } from 'src/domain';
import { Set } from 'immutable';

describe('tetromino', () => {
  const MAX_X = Tetromino._MAX_X;
  const I_v = Tetromino._create('I', Orientation.UP, 0, 15);
  const I_h = Tetromino._create('I', Orientation.RIGHT, MAX_X - 3, 15);
  it('move right', () => {
    expect(I_v.moveRight()._x).toBe(I_v._x + 1);
    expect(I_h.moveRight()._x).toBe(I_h._x);
  });

  it('move left', () => {
    expect(I_v.moveLeft()._x).toBe(I_v._x);
    expect(I_h.moveLeft()._x).toBe(I_h._x - 1);
  });

  it('descend', () => {
    expect(I_v.descend()._y).toBe(I_v._y - 1);
  });

  it('drop', () => {
    expect(I_v.drop(Set.of(Point(0, 7)))._y).toBe(8);
    expect(I_v.drop(Set())._y).toBe(0);
  });

  it('rotate', () => {
    const ih = I_v.rotate(90);
    expect(ih._orientation).toBe(90);
    expect(ih._width).toBe(4);
  });

  it('render', () => {
    expect(I_v.render()).toEqual(Set.of(Point(0, 15), Point(0, 16), Point(0, 17), Point(0, 18)));
  });

  it('shouldLock', () => {
    expect(I_v.shouldLock(Set.of(Point(0, 14)))).toBeTruthy();
    expect(I_v.shouldLock(Set.of(Point(2, 15)))).toBeFalsy();
    expect(I_h.shouldLock(Set.of(Point(MAX_X, 14)))).toBeTruthy();
    expect(I_h.shouldLock(Set.of(Point(MAX_X, 13)))).toBeFalsy();
  });
});
