import { List } from 'immutable';
import { Point } from 'src/domain';
import { Tetromino } from './tetris-tetromino';
import { Specs } from 'src/specs';

export type DepositeTable = List<List<Point>>;
export interface TetrisGameState {
  readonly x: number;
  readonly y: number;
  readonly deposit: DepositeTable;
  readonly block: Tetromino;
  readonly nextBlock: Tetromino;
}

const DefaultTetrisGameState: TetrisGameState = {
  x: Specs.tetrisGame.initialX,
  y: Specs.tetrisGame.initialY,
  deposit: List(),
  block: Tetromino.next(),
  nextBlock: Tetromino.next()
};

export const TetrisGameState = Object.freeze({
  Default: DefaultTetrisGameState,
});
