import { List, Range } from "immutable";
import { I, L, O, S, W } from "./graphic-types";
import { toIndex1 } from "./graphic-utils";

const borderFrame = Range(0, L).map(i => {
  if (i <= W || i % W === 0 || (i + 1) % W === 0 || i > L - W) {
    return I;
  } else {
    return O;
  }
}).toList();

export function snakeGameFrame(state: SnakeGameState, frameBuffer: Uint8Array): Frame {
  borderFrame.forEach((v, i) => frameBuffer[i] = v);
  state.body.forEach(p => {
    frameBuffer[toIndex1(p)] = I;
  });
  if (state.bean) {
    frameBuffer[toIndex1(state.bean)] = S;
  }
  if (state.hole) {
    frameBuffer[toIndex1(state.hole)] = O;
  }
  return List(frameBuffer);
}
