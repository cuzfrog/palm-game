import { List } from 'immutable';
import { Point } from 'src/domain';
import { Tetromino } from './tetris-tetromino';

export type DepositeTable = List<List<Point>>;
export interface TetrisGameState {
  readonly deposit: DepositeTable;
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
