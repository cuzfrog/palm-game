import {combineEpics} from 'redux-observable';
import {coreAudioEpic} from './coreAudioEpic';
import {snakeGameAudioEpic} from './snakeGameAudioEpic';

export const audioEpic = combineEpics(coreAudioEpic.epic, snakeGameAudioEpic.epic);
