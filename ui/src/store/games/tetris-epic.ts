import { combineEpics, ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { mapTo, tap, filter, map, delay, concatMap, withLatestFrom } from "rxjs/operators";
import { GameType } from "src/domain";
import { Specs } from "src/specs";
import { ActionType, CoreActions } from "../action";
import { TetrisActions } from "../action/tetris-actions";
import { heartbeatFunc } from "./common-epic";

function nextDescendAction(appState: AppState): TetrisAction {
  const s = appState.tetris;
  let a: TetrisAction;
  if (s.block.shouldLock()) {
    a = TetrisActions.lockDown();
  } else {
    a = TetrisActions.descend();
  }
  return a;
}
const descendEpic = heartbeatFunc(
  GameType.TETRIS,
  Specs.tetrisGame.baseDescendIntervalMs,
  [ActionType.GAME_NEXT_LEVEL, ActionType.TETRIS_NEXT_BLOCK],
  [ActionType.TETRIS_LINE_MARK_PAUSE],
  nextDescendAction);

const descendCheckEpic = (action$: Observable<AppAction>, state$: StateObservable<AppState>) => {
  return action$.pipe(
    ofType(ActionType.TETRIS_DESCEND),
    filter(() => state$.value.tetris.block.shouldLock()),
    mapTo(TetrisActions.lockDown()),
  );
};

const hardDropEpic = (action$: Observable<AppAction>) => {
  return action$.pipe(
    ofType(ActionType.TETRIS_HARD_DROP),
    /* state updated in reducer */
    mapTo(TetrisActions.lockDown()),
  );
};

const lockDownEpic = (action$: Observable<AppAction>, state$: StateObservable<AppState>) => {
  return action$.pipe(
    ofType(ActionType.TETRIS_LOCK_DOWN),
    /* state updated in reducer */
    tap(() => state$.value.tetris.block.lockDown()),
    mapTo(state$.value.tetris.deposit),
    map(depo => {
      const ys = depo.fullLines();
      state$.value.tetris.deposit.clearLines(ys, "mark");
      return (ys.length === 0) ? TetrisActions.nextBlock() : TetrisActions.lineMarkPause(ys);
    }),
  );
};

const LINE_CLEAR_PAUSE_DURATION = Specs.tetrisGame.markClearPauseDurationMs;
const lineMarkEpic = (action$: Observable<AppAction>, state$: Observable<AppState>) => {
  const t = ActionType.TETRIS_LINE_MARK_PAUSE;
  return action$.pipe(
    ofType(t),
    delay(LINE_CLEAR_PAUSE_DURATION),
    map(a => a.type === t && a.payload || []),
    withLatestFrom(state$),
    concatMap(([lines, s]) => s.tetris.floorCount > Specs.tetrisGame.winFloorCountPerLevel ?
      of(TetrisActions.lineClear(lines), CoreActions.win()) : of(TetrisActions.lineClear(lines))
    ),
  );
};

const lineClearEpic = (action$: Observable<AppAction>, state$: Observable<AppState>) => {
  const t = ActionType.TETRIS_LINE_CLEAR;
  return action$.pipe(
    ofType(t),
    withLatestFrom(state$),
    tap(([a, s]) => a.type === t && s.tetris.deposit.clearLines(a.payload, "clear")),
    mapTo(TetrisActions.nextBlock()),
  );
};

const SCORE_BASE = Specs.tetrisGame.baseScore;
const scoreEpic = (action$: Observable<AppAction>) => {
  const t = ActionType.TETRIS_LINE_CLEAR;
  return action$.pipe(
    ofType(t),
    concatMap(a => {
      const lineCnt = a.type === t && a.payload.length || 0;
      const score = SCORE_BASE * Math.pow(lineCnt, 1.5);
      return of(CoreActions.addScore(score), CoreActions.addCount(lineCnt));
    }),
  );
};

export const tetrisEpic = Object.freeze({
  epic: combineEpics(descendEpic, descendCheckEpic, hardDropEpic, lockDownEpic, lineMarkEpic, lineClearEpic, scoreEpic),
});
