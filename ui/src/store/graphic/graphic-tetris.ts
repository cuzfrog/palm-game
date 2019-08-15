import { toIndex } from './graphic-utils';
import { I } from './graphic-types';
import { List } from 'immutable';

export function tetrisGameFrame(state: TetrisGameState, buffer: Uint8Array): Frame {
  state.deposit.forEach(p => buffer[toIndex(p)] = I);
  state.deposit.forEach(p => buffer[toIndex(p)] = I);
  return List(buffer);
}
