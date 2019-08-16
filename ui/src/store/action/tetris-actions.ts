import { createActionWithPayload, createAction } from "./types-utils";
import { ActionType } from "./actions";

const descend = createAction(ActionType.TETRIS_DESCEND);
const rotate = createAction(ActionType.TETRIS_ROTATE);
const hardDrop = createAction(ActionType.TETRIS_HARD_DROP);
const lockDown = createAction(ActionType.TETRIS_LOCK_DOWN);

export const TetrisActions = Object.freeze({
  move: (x: number) => createActionWithPayload(ActionType.TETRIS_MOVE, x),
  rotate: () => rotate,
  descend: () => descend,
  hardDrop: () => hardDrop,
  lockDown: () => lockDown,
  lineClear: (lines: ReadonlyArray<number>) => createActionWithPayload(ActionType.TETRIS_LINE_CLEAR, lines),
});

export type TetrisAction = import("./types-utils").ActionUnion<typeof TetrisActions>;
