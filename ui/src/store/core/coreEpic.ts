import {Observable} from 'rxjs';
import {AppAction, AppState} from '../index';
import {combineEpics, ofType, StateObservable} from 'redux-observable';
import {Specs} from '../../Specs';
import {delay} from 'rxjs/operators';
import {ActionTypes} from '../actions';

const SCREEN_ROW_FRAME_DELAY = Specs.screen.refreshFrameDelay;
const refreshScreenEpic = (action$: Observable<AppAction>, state$: Observable<AppState>) => {
    return action$.pipe(
        ofType(ActionTypes.CONSOLE_REFRESH_SCREEN),
        delay(SCREEN_ROW_FRAME_DELAY),

    );
};

const exitGameEpic = (action$: Observable<AppAction>, state$: StateObservable<AppState>) => {
    return action$.pipe(
        ofType(ActionTypes.EXIT_GAME),
    );
};

export const coreEpic = {
    epic: combineEpics(refreshScreenEpic, exitGameEpic),
    _exitGameEpic: exitGameEpic,
    _refreshScreenEpic: refreshScreenEpic,
};
