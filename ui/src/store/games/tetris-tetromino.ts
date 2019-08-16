import { Set, Range } from "immutable";
import { Orientation, Point, rotateOrientation } from "src/domain";
import { Specs } from "src/specs";
import { randomInt, fallback } from "src/utils";

type Deposit = import("./tetris-state").Deposit;
type RotationDegree = import("src/domain").RotationDegree;

export interface Tetromino {
  moveLeft(): Tetromino;
  moveRight(): Tetromino;
  rotate(degree: RotationDegree): Tetromino;
  descend(): Tetromino;
  drop(deposit: Deposit): Tetromino;
  render(): Set<Point>;
  shouldLock(deposite: Deposit): boolean;
}
export interface Tetromino {
  _x: number;
  _y: number;
  _orientation: Orientation;
  _width: number;
}

type Type = "I" | "L" | "J" | "T" | "S" | "Z" | "O";
interface Base {
  readonly type: Type;
  readonly points: Set<Point>;
  readonly width: number;
}
const I = buildBase("I", Point(0, 0), Point(0, 1), Point(0, 2), Point(0, 3));
const I_h = buildBase("I", Point(0, 0), Point(1, 0), Point(2, 0), Point(3, 0));
const L = buildBase("L", Point(0, 0), Point(0, 1), Point(0, 2), Point(1, 0));
const L_m90 = buildBase("L", Point(0, 0), Point(1, 0), Point(2, 0), Point(2, 1));
const L_90 = buildBase("L", Point(0, 0), Point(0, 1), Point(1, 1), Point(2, 1));
const L_180 = buildBase("L", Point(0, 2), Point(1, 2), Point(1, 1), Point(1, 0));
const J = buildBase("J", Point(0, 0), Point(1, 0), Point(1, 1), Point(1, 2));
const J_m90 = buildBase("J", Point(0, 1), Point(1, 1), Point(2, 1), Point(0, 2));
const J_90 = buildBase("J", Point(0, 0), Point(0, 1), Point(1, 0), Point(2, 0));
const J_180 = buildBase("J", Point(0, 0), Point(0, 1), Point(0, 2), Point(1, 2));
const T = buildBase("T", Point(1, 0), Point(0, 1), Point(1, 1), Point(2, 1));
const T_m90 = buildBase("T", Point(0, 0), Point(0, 1), Point(1, 1), Point(0, 2));
const T_90 = buildBase("T", Point(0, 1), Point(1, 0), Point(1, 1), Point(1, 2));
const T_180 = buildBase("T", Point(0, 0), Point(0, 1), Point(1, 1), Point(0, 2));
const S = buildBase("S", Point(0, 0), Point(1, 0), Point(1, 1), Point(2, 1));
const S_v = buildBase("S", Point(0, 1), Point(1, 1), Point(1, 0), Point(0, 2));
const Z = buildBase("Z", Point(0, 1), Point(1, 1), Point(1, 0), Point(2, 0));
const Z_v = buildBase("Z", Point(0, 0), Point(1, 1), Point(0, 1), Point(1, 2));
const O = buildBase("O", Point(0, 0), Point(0, 1), Point(1, 1), Point(1, 0));

function buildBase(type: Type, ...points: Point[]): Base {
  const xs = points.map(p => p.x).sort();
  const width = xs[xs.length - 1] - xs[0] + 1;
  return Object.freeze({ type, points: Set(points), width });
}

const Repo = Object.freeze({
  [Orientation.UP]: { I, L, J, T, S, Z, O },
  [Orientation.LEFT]: { I: I_h, L: L_m90, J: J_m90, T: T_m90, S: S_v, Z: Z_v, O },
  [Orientation.RIGHT]: { I: I_h, L: L_90, J: J_90, T: T_90, S: S_v, Z: Z_v, O },
  [Orientation.DOWN]: { I, L: L_180, J: J_180, T: T_180, S, Z, O },
});

const MAX_X = Specs.screen.graphicWidth - 1;
class _Tetromino implements Tetromino {
  constructor(
    private readonly base: Base,
    private readonly orientation: Orientation,
    private readonly x: number,
    private readonly y: number) {
  }

  moveRight(): Tetromino {
    return (this.x + this.base.width) > MAX_X ? this : new _Tetromino(this.base, this.orientation, this.x + 1, this.y);
  }
  moveLeft(): Tetromino {
    return this.x <= 0 ? this : new _Tetromino(this.base, this.orientation, this.x - 1, this.y);
  }
  rotate(degree: RotationDegree): Tetromino {
    const o = rotateOrientation(this.orientation, degree);
    const base: Base = Repo[o][this.base.type];
    return new _Tetromino(base, o, this.x, this.y);
  }
  descend(): _Tetromino {
    return new _Tetromino(this.base, this.orientation, this.x, this.y - 1);
  }
  drop(deposit: Deposit): Tetromino { // todo: optimize algorithm
    const xs = Range(this.x, this.x + this.base.width);
    const depositYs = xs.toSeq().map(x => fallback(deposit.toSeq().filter(p => p.x === x).map(p => p.y).max(), -1)).toList();
    const baseYs = xs.toSeq().map(x =>
      this.base.points.toSeq().filter(p => p.x === x).map(p => p.y + this.y).min() as number).toList();
    const minY = depositYs.zip(baseYs).map(([dy, by]) => by - dy).min() as number;
    return new _Tetromino(this.base, this.orientation, this.x, this.y - minY + 1);
  }
  render(): Set<Point> {
    return this.base.points.map(p => Point(p.x + this.x, p.y + this.y));
  }
  shouldLock(deposit: Deposit): boolean { // todo: optimize, make base.point sorted
    return this.y <= 0 || this.base.points.toSeq()
      .map(p => Point(p.x, p.y - 1))
      .filter(p => !this.base.points.includes(p))
      .map(p => Point(p.x + this.x, p.y + this.y))
      .find(p => deposit.includes(p)) !== undefined;
  }

  get _x(): number {
    return this.x;
  }
  get _y(): number {
    return this.y;
  }
  get _orientation() {
    return this.orientation;
  }
  get _width() {
    return this.base.width;
  }
}

const probabilityEntries = Object.entries(Specs.tetrisGame.probability) as ReadonlyArray<[Type, number]>;
const PROBABILITY_TOP = Object.values(Specs.tetrisGame.probability).reduce((n1, n2) => n1 + n2);

function nextTetromino(): Tetromino {
  let n = randomInt(PROBABILITY_TOP);
  for (const [k, v] of probabilityEntries) {
    n -= v;
    if (n <= 0) {
      return createTetromino(k, Orientation.UP, Specs.tetrisGame.initialX, Specs.tetrisGame.initialY);
    }
  }
  throw Error("Assertion error: tetris PROBABILITY_TOP is invalid!");
}

function createTetromino(type: Type, orientation: Orientation, x: number, y: number): Tetromino {
  return new _Tetromino(Repo[orientation][type], orientation, x, y);
}

export const Tetromino = Object.freeze({
  next: nextTetromino,
  _create: createTetromino,
  _MAX_X: MAX_X,
  _repo: Repo,
});
