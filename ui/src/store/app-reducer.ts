import produce from 'immer';
import {SnakeGameState} from './games/snake-state';
import {ActionType} from './action';

export function appReducer(state: AppState, action: CoreAction): AppState {
    return produce(state, draft => {
        switch (action.type) {
            case ActionType.EXIT_GAME:
                draft.snake = SnakeGameState.Default;
                break;
        }
    });
}
