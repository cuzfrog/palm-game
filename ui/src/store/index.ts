import {CoreAction} from './core/coreActions';
import {SnakeAction} from './games';

export {store, AppState} from './appState';
export {ActionTypes} from './actions';

export {KeyboardDef, getKeyboard} from './keyboardDef';
export * from './core';
export * from './games';
export * from './connects';

export type AppAction = CoreAction | SnakeAction;
