import {CoreAction, CoreActions} from './core/coreActions';
import {SnakeAction} from './games';
import {KeyboardAction} from './core/keyboardActions';
import {store} from './appState';

export {store, AppState} from './appState';

export * from './core';
export * from './games';
export * from './connects';

export type AppAction = CoreAction | SnakeAction | KeyboardAction;

export const initiateConsole = () => store.dispatch(CoreActions.consoleStart());
