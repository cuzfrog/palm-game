import { Map } from 'immutable';
import { GameType, SystemStatus } from '../../domain';
import { Anim, Animations } from '../graphic';

export interface CoreState {
  readonly menuExpanded: boolean;
  readonly status: SystemStatus;
  readonly scores: Map<GameType, number>;
  readonly maxScores: Map<GameType, number>;
  readonly level: Map<GameType, number>;
  readonly gameType: GameType;
  readonly inGamePaused: boolean;
  readonly anim: Anim;
  readonly audioEnabled: boolean;

  getLevel(): number;
  getScore(): number;
}

const DefaultCoreState: CoreState = Object.freeze({
  menuExpanded: false,
  status: SystemStatus.STARTING,
  scores: Map<GameType, number>(),
  maxScores: Map<GameType, number>(),
  level: Map([[GameType.SNAKE, 3], [GameType.BOXER, 3]]),
  gameType: GameType.SNAKE,
  inGamePaused: false,
  anim: Animations.emptyAnim,
  audioEnabled: true,
  getLevel(): number {
    return this.level.get(this.gameType, 3);
  },
  getScore(): number {
    return this.scores.get(this.gameType, 0);
  }
});

export const CoreState = Object.freeze({
  Default: DefaultCoreState
});
