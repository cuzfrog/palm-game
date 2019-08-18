import { Tetromino } from "src/store/games/tetris-tetromino";
import { Orientation, Point } from "src/domain";
import { Set } from "immutable";

afterEach(() => {
  Tetromino._clearDepo();
});

describe("tetromino", () => {
  const MAX_X = Tetromino._MAX_X;
  const I_v = Tetromino._new("I", Orientation.UP, 3, 15);
  const I_h = Tetromino._new("I", Orientation.RIGHT, MAX_X - 3, 15);
  const S = Tetromino._new("S", Orientation.UP, 5, 0);
  const O = Tetromino._new("O", Orientation.UP, 0, 3);
  it("move right", () => {
    expect(I_v.moveRight()._x).toBe(I_v._x + 1);
    expect(I_h.moveRight()._x).toBe(I_h._x);
    Tetromino._setDepo(Point(4, 17));
    expect(I_v.moveRight()._x).toBe(I_v._x);
  });

  it("move left", () => {
    expect(O.moveLeft()._x).toBe(O._x);
    expect(I_h.moveLeft()._x).toBe(I_h._x - 1);
    Tetromino._setDepo(Point(2, 17));
    expect(I_v.moveLeft()._x).toBe(I_v._x);
  });

  it("descend", () => {
    expect(I_v.descend()._y).toBe(I_v._y - 1);
  });

  it("drop", () => {
    Tetromino._withDepo(Point(3, 7), () => {
      expect(I_v.hardDrop()._y).toBe(8);
    });

    Tetromino._withDepo(Point(6, 7), () => {
      expect(I_v.hardDrop()._y).toBe(0);
    });
    expect(I_v.hardDrop()._y).toBe(0);
  });

  it("rotate", () => {
    const ih = I_v.rotate();
    expect(ih._orientation).toBe(90);
    expect(ih._width).toBe(4);
  });

  it("render", () => {
    expect(I_v.render()).toEqual(Set.of(Point(3, 15), Point(3, 16), Point(3, 17), Point(3, 18)));
  });

  it("shouldLock", () => {
    Tetromino._setDepo(Point(3, 14), Point(2, 15), Point(MAX_X, 13));
    expect(I_v.shouldLock()).toBeTruthy();
    expect(I_h.shouldLock()).toBeFalsy();
    expect(S.shouldLock()).toBeTruthy();
  });
});
