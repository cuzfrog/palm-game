import {Action, createStore, Store} from 'redux';
import {systemReducer} from './system/reducer';
import {GameType, SystemState, SystemStatus} from './system/state';
import {Map} from 'immutable';
import {DefaultKeyboardLayout} from './keyboardDef';

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
        keyboardLayout: DefaultKeyboardLayout,
    },
};

export const store: Store<AppState> = createStore(combined, initialState, undefined);
