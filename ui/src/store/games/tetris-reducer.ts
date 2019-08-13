import produce from 'immer';
import { TetrisGameState } from './tetris-state';
import { TetrisAction } from '../action/tetris-actions';
import { ActionType } from '../action';

export function tetrisGameReducer(state: TetrisGameState = TetrisGameState.Default, action: TetrisAction): TetrisGameState {
  return produce(state, draft => {
    switch (action.type) {
      case ActionType.TETRIS_MOVE:
        draft.x = state.x + action.payload;
        break;
      case ActionType.TETRIS_ROTATE:
        draft.block = draft.block.rotate(action.payload);
        break;
      case ActionType.TETRIS_DESCEND:
        draft.y = draft.y - 1;
        break;
    }
  });
}
