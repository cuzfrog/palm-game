import { Specs } from "src/specs";
import { findIndexOfLast } from "src/utils";

export interface TetrisDeposit {
  check(x: number, y: number): boolean;
  mark(x: number, y: number): void;
  dropDistance(p: Point): number;
  iterate(func: (x: number, y: number, v: boolean) => void): void;
  /** Return Y-indices of lines that are full. */
  fullLines(): ReadonlyArray<number>;
  clearLines(ys: ReadonlyArray<number>): void;
}

export interface TestTetrisDeposit extends TetrisDeposit {
  buffer: ReadonlyArray<Uint8Array>;
  _set(...points: Point[]): void;
  _setLines(...ys: number[]): void;
  _clear(): void;
  _with(point: Point, callback: () => void): void;
}

type Point = import("src/domain").Point;

class _TetrisDeposit implements TetrisDeposit, TestTetrisDeposit {
  readonly buffer: Uint8Array[];

  constructor(xCap: number, yCap: number) {
    this.buffer = Array(yCap).fill(0).map(() => new Uint8Array(new ArrayBuffer(xCap)).fill(0));
  }

  check(x: number, y: number): boolean {
    return this.buffer[y][x] > 0;
  }
  mark(x: number, y: number): void {
    this.buffer[y][x] = 1;
  }
  dropDistance(p: Point): number {
    return findIndexOfLast(this.buffer, (row, y) => y <= p.y && row[p.x] > 0);
  }
  iterate(func: (x: number, y: number, v: boolean) => void): void {
    this.buffer.forEach((row, y) => {
      row.forEach((v, x) => func(x, y, v > 0));
    });
  }
  fullLines() {
    return this.buffer.map((row, y) => row.includes(0) ? -1 : y).filter(y => y >= 0);
  }
  clearLines(ys: ReadonlyArray<number>) { // ys length must be less than 4, no need to optimize the algorithm
    const clearLines = ys.map(y => this.buffer[y].fill(0));
    const retainLines = this.buffer.filter((_, y) => !ys.includes(y));
    retainLines.forEach((row, y) => this.buffer[y] = row);
    clearLines.forEach((row, y) => this.buffer[y + retainLines.length] = row);
  }

  _set(...points: Point[]) {
    points.forEach(p => this.buffer[p.y][p.x] = 1);
  }
  _setLines(...ys: number[]) {
    ys.forEach(y => this.buffer[y].fill(1));
  }
  _clear() {
    this.buffer.forEach(row => row.fill(0));
  }
  _with(point: Point, callback: () => void) {
    this._set(point);
    callback();
    this._clear();
  }
}

const singleton: TetrisDeposit = new _TetrisDeposit(Specs.screen.graphicWidth, Specs.screen.graphicHeight + 4);

export const TetrisDeposit = Object.freeze({
  getInstance: () => singleton,
  _new(width: number, height: number): TestTetrisDeposit {
    return new _TetrisDeposit(width, height);
  }
});
