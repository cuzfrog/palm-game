import { List, Range } from 'immutable';
import { I, L, O, S, W } from './graphic-types';
import { toIndex } from './graphic-utils';

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
    frameBuffer[toIndex(p)] = I;
  });
  if (state.bean) {
    frameBuffer[toIndex(state.bean)] = S;
  }
  if (state.hole) {
    frameBuffer[toIndex(state.hole)] = O;
  }
  const frame = List(frameBuffer);
  return frame;
}
