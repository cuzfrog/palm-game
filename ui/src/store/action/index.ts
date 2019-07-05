import {CoreAction} from './core-actions';
import {SnakeAction} from './snake-actions';
import {KeyboardAction} from './keyboard-actions';

export * from './actions';
export * from './core-actions';
export * from './keyboard-actions';
export * from './snake-actions';
export type AppAction = CoreAction | SnakeAction | KeyboardAction;
