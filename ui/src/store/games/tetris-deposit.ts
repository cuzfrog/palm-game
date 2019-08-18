import { Specs } from "src/specs";
import { findIndexOfLast } from "src/utils";

export interface TetrisDeposit {
  check(x: number, y: number): boolean;
  mark(x: number, y: number): void;
  dropDistance(p: Point): number;
  iterate(func: (x: number, y: number, v: boolean) => void): void;

  _setDepo(...points: Point[]): void;
  _clearDepo(): void;
  _withDepo(point: Point, callback: () => void): void;
}

type Point = import("src/domain").Point;

class _TetrisDeposit implements TetrisDeposit {
  private readonly buffer: ReadonlyArray<Uint8Array>;

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

  _setDepo(...points: Point[]) {
    points.forEach(p => this.buffer[p.y][p.x] = 1);
  }
  _clearDepo() {
    this.buffer.forEach(row => row.fill(0));
  }
  _withDepo(point: Point, callback: () => void) {
    this._setDepo(point);
    callback();
    this._clearDepo();
  }
}

const singleton: TetrisDeposit = new _TetrisDeposit(Specs.screen.graphicWidth, Specs.screen.graphicHeight + 4);

export const TetrisDeposit = Object.freeze({
  getInstance: () => singleton,
});
