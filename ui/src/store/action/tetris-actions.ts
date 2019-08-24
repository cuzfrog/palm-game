import { createActionWithPayload, createAction } from "./types-utils";
import { ActionType } from "./actions";

const rotate = createAction(ActionType.TETRIS_ROTATE);
const hardDrop = createAction(ActionType.TETRIS_HARD_DROP);
const lockDown = createAction(ActionType.TETRIS_LOCK_DOWN);
const nextBlock = createAction(ActionType.TETRIS_NEXT_BLOCK);

export const TetrisActions = Object.freeze({
  move: (x: number) => createActionWithPayload(ActionType.TETRIS_MOVE, x),
  rotate: () => rotate,
  descend: (mode: "manual" | "auto") => createActionWithPayload(ActionType.TETRIS_DESCEND, mode),
  hardDrop: () => hardDrop,
  lockDown: () => lockDown,
  nextBlock: () => nextBlock,
  lineMarkPause: (ys: ReadonlyArray<number>) => createActionWithPayload(ActionType.TETRIS_LINE_MARK_PAUSE, ys),
  lineClear: (ys: ReadonlyArray<number>) => createActionWithPayload(ActionType.TETRIS_LINE_CLEAR, ys),
});

export type TetrisAction = import("./types-utils").ActionUnion<typeof TetrisActions>;
