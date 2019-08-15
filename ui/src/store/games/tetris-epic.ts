import { combineEpics, ofType } from 'redux-observable';
import { Specs } from 'src/specs';
import { ActionType } from '../action';
import { TetrisActions } from '../action/tetris-actions';
import { heartbeatFunc } from './common-epic';
import { Observable } from 'rxjs';

function nextDescendAction(appState: AppState): TetrisAction {
  const s = appState.tetris;
  let a: TetrisAction;
  if (s.block.shouldLock(s.deposit)) {
    a = TetrisActions.lockDown();
  } else {
    a = TetrisActions.descend();
  }
  return a;
}
const descendEpic = heartbeatFunc(Specs.tetrisGame.baseDescendIntervalMs, [ActionType.GAME_NEXT_LEVEL], [], nextDescendAction);

const hardDropEpic = (action$: Observable<AppAction>, state$: Observable<AppState>) => {
  return action$.pipe(
    ofType(ActionType.TETRIS_HARD_DROP),
    
  );
};

export const tetrisEpic = Object.freeze({
  epic: combineEpics(descendEpic, hardDropEpic),
});
