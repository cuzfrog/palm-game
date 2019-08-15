import { Observable, of } from 'rxjs';
import { combineEpics, ofType } from 'redux-observable';
import { concatMap, delay, filter, map, withLatestFrom } from 'rxjs/operators';
import { ActionType, CoreActions } from '../action';
import { AnimType } from '../graphic';
import { Specs } from 'src/specs';

const animationEpic = (action$: Observable<AppAction>, state$: Observable<AppState>) => {
  return action$.pipe(
    ofType(ActionType.CONSOLE_ANIMATE, ActionType.CONSOLE_START, ActionType.TOGGLE_GAME),
    withLatestFrom(state$),
    map(([, s]) => s.core.anim),
    filter(a => a.type !== AnimType.DUMMY),
    concatMap(a => of(CoreActions.consoleAnimate()).pipe(delay(a.frameInterval))),
  );
};

const winGameEpic = (action$: Observable<AppAction>, state$: Observable<AppState>) => {
  return action$.pipe(
    ofType(ActionType.GAME_WIN),
    withLatestFrom(state$),
    map(([, s]) => s.core.getLevel()),
    concatMap(level =>
      level >= Specs.core.maxLevel ? of(CoreActions.exitGame()) : of(CoreActions.increaseLevel(), CoreActions.nextLevel())
    )
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
  epic: combineEpics(animationEpic, winGameEpic, quitGameEpic, exitGameEpic),
  _winGameEpic: winGameEpic,
  _exitGameEpic: exitGameEpic,
  _quitGameEpic: quitGameEpic,
  _animationEpic: animationEpic,
};
