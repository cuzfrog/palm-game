import { toIndex } from './graphic-utils';
import { I, O } from './graphic-types';
import { List } from 'immutable';

export function tetrisGameFrame(state: TetrisGameState, buffer: Uint8Array): Frame {
  buffer.fill(O);
  state.deposit.forEach(p => buffer[toIndex(p)] = I);
  state.block.render().forEach(p => buffer[toIndex(p)] = I);
  return List(buffer.reverse());
}
