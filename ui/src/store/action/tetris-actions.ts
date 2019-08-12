import { createActionWithPayload } from './types-utils';
import { ActionType } from './actions';

export const TetrisActions = Object.freeze({
  move: (x: number) => createActionWithPayload(ActionType.TETRIS_MOVE, x),
  rotate: (degree: import('src/domain').RotationDegree) => createActionWithPayload(ActionType.TETRIS_ROTATE, degree),
  descend: (height: number) => createActionWithPayload(ActionType.TETRIS_DESCEND, height),
});

export type TetrisAction = import('./types-utils').ActionUnion<typeof TetrisActions>;
