import produce from 'immer';
import { ActionType } from '../action';
import { TetrisAction } from '../action/tetris-actions';
import { TetrisGameState } from './tetris-state';

export function tetrisGameReducer(state: TetrisGameState = TetrisGameState.Default, action: TetrisAction): TetrisGameState {
  return produce(state, draft => {
    switch (action.type) {
      case ActionType.TETRIS_MOVE:
        draft.block = action.payload > 0 ? state.block.moveRight() : state.block.moveLeft();
        break;
      case ActionType.TETRIS_ROTATE:
        draft.block = state.block.rotate(action.payload);
        break;
      case ActionType.TETRIS_DESCEND:
        draft.block = state.block.descend();
        break;
    }
  });
}
