import { Set } from 'immutable';
import { Point } from 'src/domain';
import { Tetromino } from './tetris-tetromino';

export type Deposit = Set<Point>; // todo: optimize data structure
export interface TetrisGameState {
  readonly deposit: Deposit;
  readonly block: Tetromino;
  readonly nextBlock: Tetromino;
}

const DefaultTetrisGameState: TetrisGameState = {
  deposit: Set(),
  block: Tetromino.next(),
  nextBlock: Tetromino.next()
};

export const TetrisGameState = Object.freeze({
  Default: DefaultTetrisGameState,
});
