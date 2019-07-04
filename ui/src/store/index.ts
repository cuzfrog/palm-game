import {CoreAction, KeyboardAction, CoreActions} from './action';
import {SnakeAction} from './games';
import {store} from './app-state';

export {store, AppState} from './app-state';

export * from './core';
export * from './games';
export * from './connects';

export type AppAction = CoreAction | SnakeAction | KeyboardAction;

export const initiateConsole = () => store.dispatch(CoreActions.consoleStart());
