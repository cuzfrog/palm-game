import { List } from 'immutable';
import { Point } from 'src/domain';
import { Tetromino } from './tetris-tetromino';

export interface TetrisGameState {
  readonly deposit: List<Point>;
  readonly block: Tetromino;
  readonly nextBlock: Tetromino;
}

const DefaultTetrisGameState: TetrisGameState = {
  deposit: List(),
  block: Tetromino.next(),
  nextBlock: Tetromino.next()
};

export const TetrisGameState = Object.freeze({
  Default: DefaultTetrisGameState,
});
