import produce from "immer";
import { ActionType } from "../action";
import { TetrisAction } from "../action/tetris-actions";
import { TetrisGameState } from "./tetris-state";
import { Tetromino } from "./tetris-tetromino";

export function tetrisGameReducer(state: TetrisGameState = TetrisGameState.Default, action: TetrisAction): TetrisGameState {
  return produce(state, draft => {
    switch (action.type) {
      case ActionType.TETRIS_MOVE:
        draft.block = action.payload > 0 ? state.block.moveRight() : state.block.moveLeft();
        break;
      case ActionType.TETRIS_ROTATE:
        draft.block = state.block.rotate();
        break;
      case ActionType.TETRIS_DESCEND:
        if (!state.block.shouldLock()) {
          draft.block = state.block.descend();
        }
        break;
      case ActionType.TETRIS_HARD_DROP:
        draft.block = state.block.hardDrop();
        break;
      case ActionType.TETRIS_NEXT_BLOCK:
        draft.block = state.nextBlock;
        draft.nextBlock = Tetromino.next();
        break;
      case ActionType.TETRIS_LINE_CLEAR:
        // const lines = action.payload;
        // const maxY = lines.reduce((y1, y2) => Math.max(y1, y2), 0);
        // draft.deposit = draft.deposit.toSeq()
        //   .filter(p => !lines.includes(p.y))
        //   .map(p => p.y > maxY ? Point(p.x, p.y - lines.length) : p).toSet();
        break;
    }
  });
}
