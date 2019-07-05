import {combineEpics} from 'redux-observable';
import {keyboardEpic} from './keyboard-epic';
import {coreEpic as _coreEpic} from './core-epic';

export {CoreActions} from '../action/core-actions';
export {CoreState} from './core-state';
export {coreReducer} from './core-reducer';
export {KeyboardActions} from '../action/keyboard-actions';
export {keyboardEpic} from './keyboard-epic';

export const coreEpic = combineEpics(_coreEpic.epic, keyboardEpic.epic);
