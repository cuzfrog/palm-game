import {AppState} from './appState';
import {CoreAction} from './core/coreActions';
import produce from 'immer';
import {ActionTypes} from './actions';
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
