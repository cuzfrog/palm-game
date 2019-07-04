import {List} from 'immutable';

export * from './direction';
export * from './life';
export * from './point';

export const enum SystemStatus {
    STARTING, MENU, IN_GAME
}

export enum GameType {
    SNAKE = 'snake', BOXER = 'boxer'
}

export const enum PixelState {
    ON, OFF, TWINKLE
}

export type Frame = List<PixelState>;
