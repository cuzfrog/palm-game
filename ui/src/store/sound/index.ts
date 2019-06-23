import {combineEpics} from 'redux-observable';
import {coreAudioEpic} from './coreAudioEpic';

export const audioEpic = combineEpics(coreAudioEpic.epic);
