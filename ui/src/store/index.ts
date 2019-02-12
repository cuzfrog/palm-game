import {Action, applyMiddleware, createStore, Store} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import {systemReducer} from './system/reducer';
import {GameType, SystemState, SystemStatus} from './system/state';
import {Map} from 'immutable';
import {MenuKeyboardLayout} from './keyboardDef';

export interface AppState {
    readonly sys: SystemState;
}

function combined(state: AppState, action: Action): AppState {
    return {
        sys: systemReducer(state.sys, action),

    };
}

const initialState: AppState = {
    sys: {
        status: SystemStatus.MENU,
        scores: Map(),
        level: 1,
        gameType: GameType.SNAKE,
        inGamePaused: false,
        keyboardLayout: MenuKeyboardLayout,
    },
};

export const store: Store<AppState> = createStore(
    combined,
    initialState,
    composeWithDevTools(applyMiddleware())
);
