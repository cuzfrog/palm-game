import {Observable} from 'rxjs';
import {AppAction, AppState} from '../index';
import {combineEpics, ofType, StateObservable} from 'redux-observable';
import {ActionTypes} from '../actions';
import {filter, tap, withLatestFrom} from 'rxjs/operators';
import {SoundEffects} from './types';
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

export const coreAudioEpic = {
    epic: combineEpics(menuAudioEpic),
};
