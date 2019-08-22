import { Tetromino } from "./tetris-tetromino";
import { TetrisDeposit } from "./tetris-deposit";

export interface TetrisGameState {
  readonly deposit: TetrisDeposit;
  readonly block: Tetromino;
  readonly nextBlock: Tetromino;
}

const DefaultTetrisGameState: TetrisGameState = Object.freeze({
  deposit: TetrisDeposit.getInstance(),
  block: Tetromino.next(),
  nextBlock: Tetromino.next(),
});

export const TetrisGameState = Object.freeze({
  Default: DefaultTetrisGameState,
});
