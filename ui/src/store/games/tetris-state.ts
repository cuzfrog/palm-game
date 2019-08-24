import { Tetromino } from "./tetris-tetromino";
import { TetrisDeposit } from "./tetris-deposit";

export interface TetrisGameState {
  readonly deposit: TetrisDeposit;
  readonly block: Tetromino;
  readonly nextBlock: Tetromino;
  readonly floorCount: number;
}

const DefaultTetrisGameState: TetrisGameState = Object.freeze({
  deposit: TetrisDeposit.getInstance(),
  block: Tetromino.nextRandom(),
  nextBlock: Tetromino.nextRandom(),
  floorCount: 0,
});

export const TetrisGameState = Object.freeze({
  Default: DefaultTetrisGameState,
});
