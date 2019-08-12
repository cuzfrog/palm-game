import { combineEpics } from 'redux-observable';
import { Specs } from 'src/specs';
import { ActionType } from '../action';
import { TetrisActions } from '../action/tetris-actions';
import { heartbeatFunc } from './common-epic';

function nextDescendAction(state: AppState): TetrisAction {
  return TetrisActions.descend(1); // TODO impl
}

const descendEpic = heartbeatFunc(Specs.tetrisGame.baseDescendIntervalMs, [ActionType.NEXT_LEVEL], [], nextDescendAction);

export const tetrisEpic = Object.freeze({
  epic: combineEpics(descendEpic),
});
