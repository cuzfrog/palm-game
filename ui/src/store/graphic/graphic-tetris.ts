import { List } from "immutable";
import { I, K, O } from "./graphic-types";
import { toIndex2, xyToIndex2 } from "./graphic-utils";

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
