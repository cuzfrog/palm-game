import { toIndex2, xyToIndex2 } from "./graphic-utils";
import { I, O } from "./graphic-types";
import { List } from "immutable";

export function tetrisGameFrame(state: TetrisGameState, buffer: Uint8Array): Frame {
  buffer.fill(O);
  state.deposit.iterate((x, y, v) => {
    if (v) {
      const i = xyToIndex2(x, y);
      if (i < buffer.length) buffer[i] = I;
    }
  });
  state.block.render().forEach(p => buffer[toIndex2(p)] = I);
  return List(buffer);
}
