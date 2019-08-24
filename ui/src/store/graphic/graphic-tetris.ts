import { List } from "immutable";
import { Specs } from "src/specs";
import { Tetromino } from "../games";
import { I, K, O } from "./graphic-types";
import { toIndex2, xyToIndex2, toIndex2s } from "./graphic-utils";

export function tetrisGameFrame(state: TetrisGameState, buffer: Uint8Array): Frame {
  buffer.fill(O);
  state.deposit.render(depo => {
    depo.forEach((row, y) => {
      row.forEach((v, x) => {
        if (v > 0) {
          const i = xyToIndex2(x, y);
          if (i < buffer.length) buffer[i] = v === 1 ? I : K;
        }
      });
    });
  });
  state.block.render().forEach(p => buffer[toIndex2(p)] = I);
  return List(buffer);
}

export function tetrisSmallFrame(tetromino: Tetromino, buffer: Uint8Array): Frame {
  buffer.fill(O);
  const t = tetromino.height > Specs.screen.smallMatrixHeight ? tetromino.rotate() : tetromino;
  t.renderBase().forEach(p => buffer[toIndex2s(p)] = I);
  return List(buffer);
}
