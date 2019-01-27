import {GameType} from '../types';

export interface SystemState {
    readonly status: SystemStatus;
    readonly score: number;
    readonly level: number;
    readonly gameType: GameType;
}

// todo: try to make it const
export enum SystemStatus {
    MENU, IN_GAME, IN_GAME_PAUSED
}

export const SYSTEM_STATUS_VALUES: number[] = Object.keys(SystemStatus).map(key => SystemStatus[key]);
