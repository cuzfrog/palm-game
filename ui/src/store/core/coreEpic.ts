import {Observable} from 'rxjs';
import {ActionTypes, AppAction, AppState} from '../index';
import {ofType, StateObservable} from 'redux-observable';

const epic = (action$: Observable<AppAction>, state$: StateObservable<AppState>) => {
    return action$.pipe(
        ofType(ActionTypes.EXIT_GAME),
    );
};

export const coreEpic = {
    epic,
};
