import { combineEpics, ofType, StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import { mapTo, tap, filter, map, delay } from "rxjs/operators";
import { GameType } from "src/domain";
import { Specs } from "src/specs";
import { ActionType } from "../action";
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

const hardDropEpic = (action$: Observable<AppAction>, state$: StateObservable<AppState>) => {
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
const lineMarkEpic = (action$: Observable<AppAction>) => {
  const t = ActionType.TETRIS_LINE_MARK_PAUSE;
  return action$.pipe(
    ofType(t),
    delay(LINE_CLEAR_PAUSE_DURATION),
    map(a => a.type === t && TetrisActions.lineClear(a.payload)),
  );
};

const lineClearEpic = (action$: Observable<AppAction>, state$: StateObservable<AppState>) => {
  const t = ActionType.TETRIS_LINE_CLEAR;
  return action$.pipe(
    ofType(t),
    tap(a => a.type === t && state$.value.tetris.deposit.clearLines(a.payload, "clear")),
    mapTo(TetrisActions.nextBlock()),
  );
};

export const tetrisEpic = Object.freeze({
  epic: combineEpics(descendEpic, descendCheckEpic, hardDropEpic, lockDownEpic, lineMarkEpic, lineClearEpic),
});
