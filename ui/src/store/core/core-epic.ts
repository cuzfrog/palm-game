import { Observable, of } from 'rxjs';
import { combineEpics, ofType } from 'redux-observable';
import { concatMap, delay, filter, map, withLatestFrom } from 'rxjs/operators';
import { ActionType, CoreActions } from '../action';
import { AnimType } from '../graphic';

const animationEpic = (action$: Observable<AppAction>, state$: Observable<AppState>) => {
  return action$.pipe(
    ofType(ActionType.CONSOLE_ANIMATE, ActionType.CONSOLE_START, ActionType.TOGGLE_GAME),
    withLatestFrom(state$),
    map(([, s]) => s.core.anim),
    filter(a => a.type !== AnimType.DUMMY),
    concatMap(a => of(CoreActions.consoleAnimate()).pipe(delay(a.frameInterval))),
  );
};

const quitGameEpic = (action$: Observable<AppAction>) => {
  return action$.pipe(
    filter(a => a.type === ActionType.QUIT_GAME && a.payload),
    map(() => CoreActions.exitGame())
  );
};

const exitGameEpic = (action$: Observable<AppAction>) => {
  return action$.pipe(
    ofType(ActionType.EXIT_GAME),
    map(() => CoreActions.consoleStart())
  );
};

export const coreEpic = {
  epic: combineEpics(animationEpic, quitGameEpic, exitGameEpic),
  _exitGameEpic: exitGameEpic,
  _quitGameEpic: quitGameEpic,
  _animationEpic: animationEpic,
};
