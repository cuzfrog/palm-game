import { TetrisDeposit } from "src/store/games/tetris-deposit";
import { Point } from "src/domain";

const depo = TetrisDeposit._new(3, 4);

afterEach(() => {
  depo.clear();
});

describe("tetris-deposit", () => {

  it("get full lines", () => {
    depo._set(Point(1, 2));
    depo._setLines(0, 2);
    const fl = depo.fullLines();
    expect(fl).toHaveLength(2);
    expect(fl).toEqual([0, 2]);
  });

  it("clear lines", () => {
    const fullLines = [0, 1, 3];
    depo._setLines(...fullLines);
    depo._set(Point(1, 2));
    depo.clearLines(fullLines, "clear");
    expect(depo.buffer).toEqual([
      [0, 1, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ].map(line => new Uint8Array(line)));
  });
});
