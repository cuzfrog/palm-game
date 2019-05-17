import {Map} from 'immutable';
import {GameType, SystemStatus} from '../../domain';
import {Anim, Animations} from '../graphic';

export interface CoreState {
    readonly status: SystemStatus;
    readonly scores: Map<GameType, number>;
    readonly maxScores: Map<GameType, number>;
    readonly level: number;
    readonly gameType: GameType;
    readonly inGamePaused: boolean;
    readonly anim: Anim;
}

export const DefaultCoreState: CoreState = {
    status: SystemStatus.STARTING,
    scores: Map(),
    maxScores: Map(),
    level: 3,
    gameType: GameType.SNAKE,
    inGamePaused: false,
    anim: Animations.emptyAnim,
};
