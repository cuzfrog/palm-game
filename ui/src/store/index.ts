import {CoreAction} from './core/coreActions';
import {SnakeAction} from './games';
import {KeyboardAction} from './core/keyboardActions';

export {store, AppState} from './appState';
export {ActionTypes} from './actions';

export * from './core';
export * from './games';
export * from './connects';

export type AppAction = CoreAction | SnakeAction | KeyboardAction;
