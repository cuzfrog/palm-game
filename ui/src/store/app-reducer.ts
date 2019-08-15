import produce from 'immer';
import {SnakeGameState} from './games/snake-state';
import {ActionType} from './action';
import { TetrisGameState } from './games/tetris-state';

export function appReducer(state: AppState, action: CoreAction): AppState {
    return produce(state, draft => {
        switch (action.type) {
            case ActionType.EXIT_GAME:
                draft.snake = SnakeGameState.Default;
                draft.tetris = TetrisGameState.Default;
                break;
        }
    });
}
