import {combineEpics} from 'redux-observable';
import {keyboardEpic} from './keyboardEpic';
import {coreEpic as _coreEpic} from './coreEpic';

export {CoreActions} from './coreActions';
export {CoreState, DefaultCoreState} from './coreState';
export {coreReducer} from './coreReducer';
export {KeyboardActions} from './keyboardActions';
export {keyboardEpic} from './keyboardEpic';

export const coreEpic = combineEpics(_coreEpic.epic, keyboardEpic.epic);
