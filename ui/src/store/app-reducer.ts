import {AppState} from './app-state';
import {CoreAction, ActionTypes} from './action';
import produce from 'immer';
import {DefaultSnakeGameState} from './games';

export function appReducer(state: AppState, action: CoreAction): AppState {
    return produce(state, draft => {
        switch (action.type) {
            case ActionTypes.EXIT_GAME:
                draft.snake = DefaultSnakeGameState;
                break;
        }
    });
}
