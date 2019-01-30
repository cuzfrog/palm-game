import {GameType, SystemStatus} from '../types';
import {Map} from 'immutable';

export interface SystemState {
    readonly status: SystemStatus;
    readonly scores: Map<GameType, number>;
    readonly level: number;
    readonly gameType: GameType;
    readonly inGamePaused: boolean;
}
