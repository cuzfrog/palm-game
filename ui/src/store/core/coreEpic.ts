import {Observable, of} from 'rxjs';
import {AppAction, AppState, CoreActions} from '../index';
import {combineEpics, ofType, StateObservable} from 'redux-observable';
import {concatMap, delay, filter, map, withLatestFrom} from 'rxjs/operators';
import {ActionTypes} from '../actions';
import {AnimType} from '../graphic';

const animationEpic = (action$: Observable<AppAction>, state$: Observable<AppState>) => {
    return action$.pipe(
        ofType(ActionTypes.CONSOLE_ANIMATE, ActionTypes.CONSOLE_START),
        withLatestFrom(state$),
        map(([, s]) => s.core.anim),
        filter(a => a.type !== AnimType.DUMMY),
        concatMap(a => of(CoreActions.consoleAnimate()).pipe(delay(a.frameInterval))),
    );
};

const exitGameEpic = (action$: Observable<AppAction>, state$: StateObservable<AppState>) => {
    return action$.pipe(
        ofType(ActionTypes.EXIT_GAME),
    );
};

export const coreEpic = {
    epic: combineEpics(animationEpic, exitGameEpic),
    _exitGameEpic: exitGameEpic,
    _animationEpic: animationEpic,
};
