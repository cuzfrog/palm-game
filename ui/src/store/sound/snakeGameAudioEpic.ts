import {combineEpics} from 'redux-observable';
import {ActionTypes} from '../action';
import {createAudioEpic, SoundEffects} from './audioTypes';

const eatBeanAudioEpic = createAudioEpic(
    SoundEffects.sfxSnakeEatBean,
    a => a.type === ActionTypes.SNAKE_CREEP && a.payload.grown
);

const damageAudioEpic = createAudioEpic(
    SoundEffects.sfxSnakeDamage,
    [ActionTypes.SNAKE_HIT_WALL, ActionTypes.SNAKE_BITE_SELF]
);

const escapeAudioEpic = createAudioEpic(
    SoundEffects.sfxSnakeEscape,
    a => a.type === ActionTypes.SNAKE_ESCAPE && a.payload === 0
);

export const snakeGameAudioEpic = combineEpics(eatBeanAudioEpic, damageAudioEpic, escapeAudioEpic);
