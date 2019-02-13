import {Action, applyMiddleware, createStore, Store} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import {systemReducer} from './system/reducer';
import {GameType, SystemState, SystemStatus} from './system/state';
import {Map} from 'immutable';
import {MenuKeyboardLayout} from './keyboardDef';
import {snakeGameReducer} from './games/snake/reducer';
import {SnakeGameState} from './games/snake/state';
import {Direction} from './types';

export interface AppState {
    readonly sys: SystemState;
    readonly snake: SnakeGameState;
}

function combined(state: AppState, action: Action): AppState {
    return {
        sys: systemReducer(state.sys, action),
        snake: snakeGameReducer(state.snake, action),
    };
}

export const InitialState: AppState = {
    sys: {
        status: SystemStatus.MENU,
        scores: Map(),
        level: 1,
        gameType: GameType.SNAKE,
        inGamePaused: false,
        keyboardLayout: MenuKeyboardLayout,
    },
    snake: {
        life: 3,
        length: 5,
        direction: Direction.NORTH,
    }
};

export const store: Store<AppState> = createStore(
    combined,
    InitialState,
    composeWithDevTools(applyMiddleware())
);
