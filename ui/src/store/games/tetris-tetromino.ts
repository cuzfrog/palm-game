import { List } from 'immutable';
import { Orientation, Point, rotateOrientation } from 'src/domain';
import { Specs } from 'src/specs';
import { randomInt } from 'src/utils';

type DepositeTable = import('./tetris-state').DepositeTable;
type RotationDegree = import('src/domain').RotationDegree;

const enum TetrominoType {
  I = 'I', L = 'L', J = 'J', T = 'T', S = 'S', Z = 'Z', O = 'O'
}

export interface Tetromino {
  moveLeft(): Tetromino;
  moveRight(): Tetromino;
  rotate(degree: RotationDegree): Tetromino;
  descend(): Tetromino;
  render(): List<Point>;
  shouldLock(deposite: DepositeTable): boolean;
}

type TetrominoBase = { b: List<Point>, w: number };
const I = { b: List.of(Point(0, 0), Point(0, 1), Point(0, 2), Point(0, 3)), w: 1 };
const I_h = { b: List.of(Point(0, 0), Point(1, 0), Point(2, 0), Point(3, 0)), w: 4 };
const L = { b: List.of(Point(0, 0), Point(0, 1), Point(0, 2), Point(1, 0)), w: 2 };
const L_m90 = { b: List.of(Point(0, 0), Point(1, 0), Point(2, 0), Point(2, 1)), w: 3 };
const L_90 = { b: List.of(Point(0, 0), Point(0, 1), Point(1, 1), Point(2, 1)), w: 3 };
const L_180 = { b: List.of(Point(0, 2), Point(1, 2), Point(1, 1), Point(1, 0)), w: 2 };
const J = { b: List.of(Point(0, 0), Point(1, 0), Point(1, 1), Point(1, 2)), w: 3 };
const J_m90 = { b: List.of(Point(0, 1), Point(1, 1), Point(2, 1), Point(0, 2)), w: 3 };
const J_90 = { b: List.of(Point(0, 0), Point(0, 1), Point(1, 0), Point(2, 0)), w: 3 };
const J_180 = { b: List.of(Point(0, 0), Point(0, 1), Point(0, 2), Point(1, 2)), w: 2 };
const T = { b: List.of(Point(1, 0), Point(0, 1), Point(1, 1), Point(2, 1)), w: 3 };
const T_m90 = { b: List.of(Point(0, 0), Point(0, 1), Point(1, 1), Point(0, 2)), w: 2 };
const T_90 = { b: List.of(Point(0, 1), Point(1, 0), Point(1, 1), Point(1, 2)), w: 2 };
const T_180 = { b: List.of(Point(0, 0), Point(0, 1), Point(1, 1), Point(0, 2)), w: 3 };
const S = { b: List.of(Point(0, 0), Point(1, 0), Point(1, 1), Point(2, 1)), w: 3 };
const S_v = { b: List.of(Point(0, 1), Point(1, 1), Point(1, 0), Point(0, 2)), w: 2 };
const Z = { b: List.of(Point(0, 1), Point(1, 1), Point(1, 0), Point(2, 0)), w: 3 };
const Z_v = { b: List.of(Point(0, 0), Point(1, 1), Point(0, 1), Point(1, 2)), w: 2 };
const O = { b: List.of(Point(0, 0), Point(0, 1), Point(1, 1), Point(1, 0)), w: 2 };

const TetrominoRepo = Object.freeze({
  [Orientation.UP]: { I, L, J, T, S, Z, O },
  [Orientation.LEFT]: { I: I_h, L: L_m90, J: J_m90, T: T_m90, S: S_v, Z: Z_v, O },
  [Orientation.RIGHT]: { I: I_h, L: L_90, J: J_90, T: T_90, S: S_v, Z: Z_v, O },
  [Orientation.DOWN]: { I, L: L_180, J: J_180, T: T_180, S, Z, O },
});

const MAX_X = Specs.screen.graphicWidth - 1;
class _Tetromino implements Tetromino {

  constructor(private readonly type: TetrominoType,
              private readonly orientation: Orientation,
              private readonly x: number,
              private readonly y: number) {
  }

  moveRight(): Tetromino {
    return this.x >= MAX_X ? this : new _Tetromino(this.type, this.orientation, this.x + 1, this.y);
  }
  moveLeft(): Tetromino {
    return this.x <= 0 ? this : new _Tetromino(this.type, this.orientation, this.x - 1, this.y);
  }
  rotate(degree: RotationDegree): Tetromino {
    return new _Tetromino(this.type, rotateOrientation(this.orientation, degree), this.x, this.y);
  }
  descend(): Tetromino {
    return new _Tetromino(this.type, this.orientation, this.x, this.y - 1);
  }
  render(): List<Point> {
    const base: TetrominoBase = TetrominoRepo[this.orientation][this.type];
    return base.b.map(p => Point(p.x + this.x, p.y + this.y));
  }
  shouldLock(deposite: DepositeTable): boolean {
    return true;
  }
}

const probabilityEntries = Object.entries(Specs.tetrisGame.probability) as ReadonlyArray<[TetrominoType, number]>;
const PROBABILITY_TOP = Object.values(Specs.tetrisGame.probability).reduce((n1, n2) => n1 + n2);

function nextTetromino(): Tetromino {
  let n = randomInt(PROBABILITY_TOP);
  for (const [k, v] of probabilityEntries) {
    n -= v;
    if (n <= 0) {
      return new _Tetromino(k, Orientation.UP, Specs.tetrisGame.initialX, Specs.tetrisGame.initialY);
    }
  }
  throw Error('Assertion error: tetris PROBABILITY_TOP is invalid!');
}

export const Tetromino = Object.freeze({
  next: nextTetromino
});
