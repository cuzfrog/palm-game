import { Tetromino } from "./tetris-tetromino";

export interface TetrisGameState {
  readonly block: Tetromino;
  readonly nextBlock: Tetromino;
}

const DefaultTetrisGameState: TetrisGameState = Object.freeze({
  block: Tetromino.next(),
  nextBlock: Tetromino.next()
});

export const TetrisGameState = Object.freeze({
  Default: DefaultTetrisGameState,
});
