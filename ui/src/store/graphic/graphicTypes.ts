import {Frame, PixelState} from '../../domain';
import {Range} from 'immutable';
import {Specs} from '../../Specs';

export interface Anim {
    readonly type: AnimType;
    readonly frameInterval: number;
    isCompleted(): boolean;
    advance(): Anim;
    currentFrame(frameBuffer: PixelState[]): Frame;
}

export const enum AnimType {
    DUMMY = 'animation - dummy',
    CONSOLE_START = 'animation - console start',
    GAME_SNAKE = 'animation - game snake',
    GAME_BOXER = 'animation - game boxer',
}

export const I = PixelState.ON;
export const O = PixelState.OFF;
export const S = PixelState.TWINKLE;
export const W = Specs.screen.graphicWidth;
export const H = Specs.screen.graphicHeight;
export const L = W * H;
export const BLANK_FRAME = Range(0, L).map(() => O).toList();
