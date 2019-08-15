import { GameStatus, GameType } from 'src/domain';
import { ActionType } from '../action';
import { filter, withLatestFrom, map, switchMap, takeUntil } from 'rxjs/operators';
import { calculateInterval } from 'src/utils';
import { Observable, timer } from 'rxjs';

export function heartbeatFunc(gameType: GameType,
                              baseInterval: number,
                              triggerActionTypes: ReadonlyArray<ActionType>,
                              stopActionTypes: ReadonlyArray<ActionType>,
                              actionMapFunc: (state: AppState) => AppAction) {
  return (action$: Observable<AppAction>, state$: Observable<AppState>) => {
    return action$.pipe(
      filter(a => a.type === ActionType.ENTER_GAME || triggerActionTypes.includes(a.type)),
      withLatestFrom(state$),
      map(([, s]) => s),
      filter(s => s.core.gameType === gameType),
      switchMap(state => {
        const interval = calculateInterval(baseInterval, state.core.getLevel());
        return timer(interval, interval).pipe(
          takeUntil(action$.pipe(filter(a => a.type === ActionType.EXIT_GAME || stopActionTypes.includes(a.type)))),
          withLatestFrom(state$),
          map(([, s]) => s),
          filter(s => s.core.gameStatus === GameStatus.RUNNING),
          map(actionMapFunc)
        );
      }),
    );
  };
}
