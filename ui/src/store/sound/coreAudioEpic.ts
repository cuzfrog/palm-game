import {Observable} from 'rxjs';
import {AppAction, AppState} from '../index';
import {combineEpics, ofType, StateObservable} from 'redux-observable';
import {ActionTypes} from '../action';
import {filter, tap, withLatestFrom} from 'rxjs/operators';
import {SoundEffects} from './audioSources';
import {SystemStatus} from '../../domain';

const menuAudioEpic = (action$: Observable<AppAction>, state$: StateObservable<AppState>) => {
    return action$.pipe(
        ofType(ActionTypes.INCREASE_LEVEL, ActionTypes.DECREASE_LEVEL),
        withLatestFrom(state$),
        filter(([, s]) => s.core.status === SystemStatus.MENU),
        tap(() => SoundEffects.playSfxCoreMenu()),
        filter(() => false),
    );
};

const enterGameAudioEpic = (action$: Observable<AppAction>, state$: StateObservable<AppState>) => {
    return action$.pipe(
        ofType(ActionTypes.ENTER_GAME),
        tap(() => SoundEffects.playSfxStart()),
        filter(() => false),
    );
};

const pauseAudioEpic = (action$: Observable<AppAction>, state$: StateObservable<AppState>) => {
    return action$.pipe(
        ofType(ActionTypes.TOGGLE_PAUSE),
        withLatestFrom(state$),
        filter(([, s]) => s.core.status === SystemStatus.IN_GAME),
        tap(([, s]) => s.core.inGamePaused ? SoundEffects.playSfxPauseIn() : SoundEffects.playSfxPauseOut()),
        filter(() => false),
    );
};

export const coreAudioEpic = {
    epic: combineEpics(menuAudioEpic, enterGameAudioEpic, pauseAudioEpic),
};
