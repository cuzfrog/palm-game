import { combineEpics } from 'redux-observable';
import { Specs } from 'src/specs';
import { ActionType } from '../action';
import { TetrisActions } from '../action/tetris-actions';
import { heartbeatFunc } from './common-epic';

function nextDescendAction(appState: AppState): TetrisAction {
  const s = appState.tetris;
  return TetrisActions.descend();
}

const descendEpic = heartbeatFunc(Specs.tetrisGame.baseDescendIntervalMs, [ActionType.NEXT_LEVEL], [], nextDescendAction);

export const tetrisEpic = Object.freeze({
  epic: combineEpics(descendEpic),
});
