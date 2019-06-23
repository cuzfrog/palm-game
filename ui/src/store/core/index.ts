import {combineEpics} from 'redux-observable';
import {keyboardEpic} from './keyboardEpic';
import {coreEpic as _coreEpic} from './coreEpic';

export {CoreActions} from '../action/coreActions';
export {CoreState, DefaultCoreState} from './coreState';
export {coreReducer} from './coreReducer';
export {KeyboardActions} from '../action/keyboardActions';
export {keyboardEpic} from './keyboardEpic';

export const coreEpic = combineEpics(_coreEpic.epic, keyboardEpic.epic);
