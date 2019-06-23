import {Observable} from 'rxjs';
import {AppAction} from '../index';
import {combineEpics, ofType} from 'redux-observable';
import {ActionTypes} from '../action';
import {filter, tap} from 'rxjs/operators';
import {SoundEffects} from './audioSources';

const eatBeanAudioEpic = (action$: Observable<AppAction>) => {
    return action$.pipe(
        filter(a => a.type === ActionTypes.SNAKE_CREEP && a.payload.grown),
        tap(() => SoundEffects.playSfxSnakeEatBean()),
        filter(() => false),
    );
};

const damageAudioEpic = (action$: Observable<AppAction>) => {
    return action$.pipe(
        ofType(ActionTypes.SNAKE_HIT_WALL, ActionTypes.SNAKE_BITE_SELF),
        tap(() => SoundEffects.playSfxSnakeDamage()),
        filter(() => false),
    );
};

export const snakeGameAudioEpic = {
    epic: combineEpics(eatBeanAudioEpic, damageAudioEpic),
};
