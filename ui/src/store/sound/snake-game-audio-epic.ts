import {combineEpics} from 'redux-observable';
import {ActionType} from '../action';
import {createAudioEpic, SoundEffects} from './audio-types';

const eatBeanAudioEpic = createAudioEpic(
    SoundEffects.sfxSnakeEatBean,
    a => a.type === ActionType.SNAKE_CREEP && a.payload.grown
);

const damageAudioEpic = createAudioEpic(
    SoundEffects.sfxSnakeDamage,
    [ActionType.SNAKE_HIT_WALL, ActionType.SNAKE_BITE_SELF]
);

const escapeAudioEpic = createAudioEpic(
    SoundEffects.sfxSnakeEscape,
    a => a.type === ActionType.SNAKE_ESCAPE && a.payload === 0
);

export const snakeGameAudioEpic = combineEpics(eatBeanAudioEpic, damageAudioEpic, escapeAudioEpic);
