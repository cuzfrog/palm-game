import { combineEpics } from 'redux-observable';
import { Specs } from 'src/specs';
import { ActionType } from '../action';
import { TetrisActions } from '../action/tetris-actions';
import { heartbeatFunc } from './common-epic';

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

export const tetrisEpic = Object.freeze({
  epic: combineEpics(descendEpic),
});
