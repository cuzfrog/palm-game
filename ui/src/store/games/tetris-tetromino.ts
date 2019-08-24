import { Set, Range } from "immutable";
import { Orientation, Point, rotateOrientation } from "src/domain";
import { Specs } from "src/specs";
import { randomInt } from "src/utils";
import { TetrisDeposit } from "./tetris-deposit";
import { createSelector } from "reselect";

export interface Tetromino {
  moveLeft(): Tetromino;
  moveRight(): Tetromino;
  rotate(): Tetromino;
  descend(): Tetromino;
  hardDrop(): Tetromino;
  render(): Set<Point>;
  renderBase(): Set<Point>;
  shouldLock(): boolean;
  lockDown(): void;
}
export interface Tetromino {
  width: number;
  height: number;
  _x: number;
  _y: number;
  _orientation: Orientation;
}

export type TetrominoType = "I" | "L" | "J" | "T" | "S" | "Z" | "O";
interface Base {
  readonly type: TetrominoType;
  readonly body: Set<Point>;
  readonly width: number;
  readonly height: number;
}
const I = buildBase("I", Point(0, 0), Point(0, 1), Point(0, 2), Point(0, 3));
const I_h = buildBase("I", Point(0, 0), Point(1, 0), Point(2, 0), Point(3, 0));
const L = buildBase("L", Point(0, 0), Point(0, 1), Point(0, 2), Point(1, 0));
const L_m90 = buildBase("L", Point(0, 0), Point(1, 0), Point(2, 0), Point(2, 1));
const L_90 = buildBase("L", Point(0, 0), Point(0, 1), Point(1, 1), Point(2, 1));
const L_180 = buildBase("L", Point(0, 2), Point(1, 2), Point(1, 1), Point(1, 0));
const J = buildBase("J", Point(0, 0), Point(1, 0), Point(1, 1), Point(1, 2));
const J_m90 = buildBase("J", Point(2, 0), Point(0, 1), Point(1, 1), Point(2, 1));
const J_90 = buildBase("J", Point(0, 0), Point(0, 1), Point(1, 0), Point(2, 0));
const J_180 = buildBase("J", Point(0, 0), Point(0, 1), Point(0, 2), Point(1, 2));
const T = buildBase("T", Point(1, 0), Point(0, 1), Point(1, 1), Point(2, 1));
const T_m90 = buildBase("T", Point(0, 0), Point(0, 1), Point(1, 1), Point(0, 2));
const T_90 = buildBase("T", Point(0, 1), Point(1, 0), Point(1, 1), Point(1, 2));
const T_180 = buildBase("T", Point(0, 0), Point(1, 0), Point(2, 0), Point(1, 1));
const S = buildBase("S", Point(0, 0), Point(1, 0), Point(1, 1), Point(2, 1));
const S_v = buildBase("S", Point(0, 1), Point(1, 1), Point(1, 0), Point(0, 2));
const Z = buildBase("Z", Point(0, 1), Point(1, 1), Point(1, 0), Point(2, 0));
const Z_v = buildBase("Z", Point(0, 0), Point(1, 1), Point(0, 1), Point(1, 2));
const O = buildBase("O", Point(0, 0), Point(0, 1), Point(1, 1), Point(1, 0));

function buildBase(type: TetrominoType, ...points: Point[]): Base {
  const xs = points.map(p => p.x).sort();
  const width = xs[xs.length - 1] - xs[0] + 1;
  const ys = points.map(p => p.y).sort();
  const height = ys[ys.length - 1] - ys[0] + 1;
  return Object.freeze({ type, body: Set(points), width, height });
}

const Repo = Object.freeze({
  [Orientation.UP]: { I, L, J, T, S, Z, O },
  [Orientation.LEFT]: { I: I_h, L: L_m90, J: J_m90, T: T_m90, S: S_v, Z: Z_v, O },
  [Orientation.RIGHT]: { I: I_h, L: L_90, J: J_90, T: T_90, S: S_v, Z: Z_v, O },
  [Orientation.DOWN]: { I, L: L_180, J: J_180, T: T_180, S, Z, O },
});

const MAX_X = Specs.screen.graphicWidth - 1;
/** Immutable */
class _Tetromino implements Tetromino {
  private readonly body: Set<Point>;
  constructor(
    private readonly depo: TetrisDeposit,
    private readonly base: Base,
    private readonly orientation: Orientation,
    private readonly x: number,
    private readonly y: number) {
    this.body = base.body.map(p => Point(p.x + x, p.y + y));
  }

  moveRight(): Tetromino {
    let moved: Tetromino;
    if ((this.x + this.width) > MAX_X) moved = this;
    else if (this.body.find(p => this.depo.check(p.x + 1, p.y))) moved = this;
    else moved = new _Tetromino(this.depo, this.base, this.orientation, this.x + 1, this.y);
    return moved;
  }
  moveLeft(): Tetromino {
    let moved: Tetromino;
    if (this.x <= 0) moved = this;
    else if (this.body.find(p => this.depo.check(p.x - 1, p.y))) moved = this;
    else moved = new _Tetromino(this.depo, this.base, this.orientation, this.x - 1, this.y);
    return moved;
  }
  rotate(): Tetromino {
    const o = rotateOrientation(this.orientation, 90);
    const base: Base = Repo[o][this.base.type];
    const offX = Math.max(this.x + base.width - MAX_X - 1, 0);
    const moved = new _Tetromino(this.depo, base, o, this.x - offX, this.y);
    return moved.body.find(p => this.depo.check(p.x, p.y)) ? this : moved;
  }
  descend(): _Tetromino {
    return new _Tetromino(this.depo, this.base, this.orientation, this.x, this.y - 1);
  }
  hardDrop(): Tetromino { // todo: optimize algorithm
    const xs = Range(this.x, this.x + this.base.width);
    const lowestBody = xs.map(x => this.body.toSeq().filter(p => p.x === x).minBy(p => p.y) as Point);
    const depositYs = lowestBody.toSeq().map(p => this.depo.dropDistance(p)).toList();
    const bodyYs = lowestBody.map(p => p.y);
    const minY = depositYs.zip(bodyYs).map(([dy, by]) => by - dy).min() as number;
    return new _Tetromino(this.depo, this.base, this.orientation, this.x, this.y - minY + 1);
  }
  render(): Set<Point> {
    return this.body;
  }
  renderBase() {
    return this.base.body;
  }
  shouldLock(): boolean {
    return this.y <= 0 || this.body.find(p => this.depo.check(p.x, p.y - 1)) !== undefined;
  }
  lockDown(): void {
    this.body.forEach(p => this.depo.mark(p.x, p.y));
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
  get width() {
    return this.base.width;
  }
  get height() {
    return this.base.height;
  }
}

const DummyTetromino: Tetromino = Object.freeze({
  moveLeft() { return this; },
  moveRight() { return this; },
  rotate() { return this; },
  descend() { return this; },
  hardDrop() { return this; },
  render() { return Set(); },
  renderBase() { return Set(); },
  shouldLock() { return false; },
  lockDown: () => null,
  _x: -1,
  _y: -1,
  _orientation: Orientation.UP,
  width: -1,
  height: -1
});

const probabilityEntries = Object.entries(Specs.tetrisGame.probability) as ReadonlyArray<[TetrominoType, number]>;
const PROBABILITY_TOP = Object.values(Specs.tetrisGame.probability).reduce((n1, n2) => n1 + n2);

function randomTetromino(): Tetromino {
  let n = randomInt(PROBABILITY_TOP);
  for (const [k, v] of probabilityEntries) {
    n -= v;
    if (n <= 0) {
      return memorisedCreateTetromino(k);
    }
  }
  throw Error("Assertion error: tetris PROBABILITY_TOP is invalid!");
}

function createTetromino(type: TetrominoType,
                         orientation: Orientation,
                         x: number,
                         y: number,
                         depo: TetrisDeposit = TetrisDeposit.getInstance()): Tetromino {
  return new _Tetromino(depo, Repo[orientation][type], orientation, x, y);
}
const memorisedCreateTetromino = createSelector(
  (type: TetrominoType) => type,
  t => createTetromino(t, Orientation.UP, Specs.tetrisGame.initialX, Specs.tetrisGame.initialY)
);

export const Tetromino = Object.freeze({
  nextRandom: randomTetromino,
  dummy: DummyTetromino,
  new: createTetromino,
  _MAX_X: MAX_X,
});
