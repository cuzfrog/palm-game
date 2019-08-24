import { Tetromino } from "src/store/games/tetris-tetromino";
import { Orientation, Point } from "src/domain";
import { Set } from "immutable";
import { TetrisDeposit } from "src/store/games/tetris-deposit";

const depo = TetrisDeposit._new(10, 18);

afterEach(() => {
  depo.clear();
});

describe("tetromino", () => {
  const I_v = Tetromino.new("I", Orientation.UP, 3, 15, depo);
  const I_h = Tetromino.new("I", Orientation.RIGHT, 7, 15, depo);
  const S = Tetromino.new("S", Orientation.UP, 5, 0, depo);
  const O = Tetromino.new("O", Orientation.UP, 0, 3, depo);
  it("move right", () => {
    expect(I_v.moveRight()._x).toBe(I_v._x + 1);
    expect(I_h.moveRight()._x).toBe(I_h._x);
    depo._set(Point(4, 17));
    expect(I_v.moveRight()._x).toBe(I_v._x);
  });

  it("move left", () => {
    expect(O.moveLeft()._x).toBe(O._x);
    expect(I_h.moveLeft()._x).toBe(I_h._x - 1);
    depo._set(Point(2, 17));
    expect(I_v.moveLeft()._x).toBe(I_v._x);
  });

  it("descend", () => {
    expect(I_v.descend()._y).toBe(I_v._y - 1);
  });

  it("drop", () => {
    depo._with(Point(3, 7), () => {
      expect(I_v.hardDrop()._y).toBe(8);
    });

    depo._with(Point(6, 7), () => {
      expect(I_v.hardDrop()._y).toBe(0);
    });
    expect(I_v.hardDrop()._y).toBe(0);
  });

  it("rotate", () => {
    const ih = I_v.rotate();
    expect(ih._orientation).toBe(90);
    expect(ih.width).toBe(4);
  });

  it("render", () => {
    expect(I_v.render()).toEqual(Set.of(Point(3, 15), Point(3, 16), Point(3, 17), Point(3, 18)));
  });

  it("shouldLock", () => {
    depo._set(Point(3, 14), Point(2, 15), Point(10, 13));
    expect(I_v.shouldLock()).toBeTruthy();
    expect(I_h.shouldLock()).toBeFalsy();
    expect(S.shouldLock()).toBeTruthy();
  });
});
