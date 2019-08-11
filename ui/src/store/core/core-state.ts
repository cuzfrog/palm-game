import { Map } from 'immutable';
import { GameType, SystemStatus, GameStatus } from 'src/domain';
import { Anim, Animations } from '../graphic';

export interface CoreState {
  readonly status: SystemStatus;
  readonly scores: Map<GameType, number>;
  readonly maxScores: Map<GameType, number>;
  readonly level: Map<GameType, number>;
  readonly gameType: GameType;
  readonly gameStatus: GameStatus;
  readonly anim: Anim;
  readonly audioEnabled: boolean;

  getLevel(): number;
  getScore(): number;
  isPaused(): boolean;
}

const DefaultCoreState: CoreState = Object.freeze({
  status: SystemStatus.STARTING,
  scores: Map<GameType, number>(),
  maxScores: Map<GameType, number>(),
  level: Map([[GameType.SNAKE, 3], [GameType.TETRIS, 3]]),
  gameType: GameType.SNAKE,
  gameStatus: GameStatus.STOPPED,
  anim: Animations.emptyAnim,
  audioEnabled: true,
  getLevel(): number {
    return this.level.get(this.gameType, 3);
  },
  getScore(): number {
    return this.scores.get(this.gameType, 0);
  },
  isPaused,
});

function isPaused(this: CoreState) {
  return (this.gameStatus === GameStatus.PAUSED) || (this.gameStatus === GameStatus.TO_QUIT);
}

export const CoreState = Object.freeze({
  Default: DefaultCoreState
});
