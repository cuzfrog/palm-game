export enum SystemStatus { // todo: try to make it const
    MENU, IN_GAME
}

export const SYSTEM_STATUS_VALUES: ReadonlyArray<number> = Object.keys(SystemStatus).map(key => SystemStatus[key]);

export const enum GameType {
    SNAKE, BOXER,
}
