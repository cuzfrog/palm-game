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

export const snakeGameAudioEpic = {
    epic: combineEpics(eatBeanAudioEpic, damageAudioEpic),
};
