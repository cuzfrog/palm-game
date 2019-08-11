import { List } from 'immutable';
import { Point } from 'src/domain';

export interface TetrisGameState {
  readonly deposit: List<Point>;
  readonly block: List<Point>;
  readonly nextBlock: List<Point>;
}


