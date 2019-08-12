import { List } from 'immutable';
import { Point, Orientation, rotateOrientation } from 'src/domain';
import { Specs } from 'src/specs';
import { randomInt } from 'src/utils';

type RotationDegree = import('src/domain').RotationDegree;

const enum TetrominoType {
  I = 'I', L = 'L', J = 'J', T = 'T', S = 'S', Z = 'Z', O = 'O'
}

export interface Tetromino {
  rotate(degree: RotationDegree): Tetromino;
  render(x: number, y: number, borderLeft: number, bordRight: number): List<Point>;
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

class TetrominoImpl implements Tetromino {
  readonly type: TetrominoType;
  readonly orientation: Orientation;

  constructor(type: TetrominoType, orientation: Orientation) {
    this.type = type;
    this.orientation = orientation;
  }

  rotate(degree: RotationDegree): Tetromino {
    return new TetrominoImpl(this.type, rotateOrientation(this.orientation, degree));
  }
  render(x: number, y: number, borderLeft: number, bordRight: number): List<Point> {
    const base: TetrominoBase = TetrominoRepo[this.orientation][this.type];
    const _x = x + base.w > bordRight ? bordRight - base.w : x;
    return base.b.map(p => Point(p.x + _x, p.y + y));
  }
}

const probabilityEntries = Object.entries(Specs.tetrisGame.probability) as ReadonlyArray<[TetrominoType, number]>;
const PROBABILITY_TOP = Object.values(Specs.tetrisGame.probability).reduce((n1, n2) => n1 + n2);

function nextTetromino(): Tetromino {
  let n = randomInt(PROBABILITY_TOP);
  for (const [k, v] of probabilityEntries) {
    n -= v;
    if (n <= 0) {
      return new TetrominoImpl(k, Orientation.UP);
    }
  }
  throw Error('Assertion error: tetris PROBABILITY_TOP is invalid!');
}

export const Tetromino = Object.freeze({
  next: nextTetromino
});
