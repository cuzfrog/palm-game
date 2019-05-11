import {Map} from 'immutable';
import {GameType, SystemStatus} from '../../domain';
import {emptyShow, Show} from '../graphic';

export interface CoreState {
    readonly status: SystemStatus;
    readonly scores: Map<GameType, number>;
    readonly maxScores: Map<GameType, number>;
    readonly level: number;
    readonly gameType: GameType;
    readonly inGamePaused: boolean;
    readonly screenShow: Show;
}

export const DefaultCoreState: CoreState = {
    status: SystemStatus.MENU,
    scores: Map(),
    maxScores: Map(),
    level: 3,
    gameType: GameType.SNAKE,
    inGamePaused: false,
    screenShow: emptyShow,
};
