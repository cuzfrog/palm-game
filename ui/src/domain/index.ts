import {List} from 'immutable';

export * from './Direction';
export * from './Life';
export * from './Point';

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
