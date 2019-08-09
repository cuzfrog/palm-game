import { BLANK_FRAME } from './graphic-types';
import { ConsoleStartAnimation } from './animation-console-start';
import { SnakeAnimation } from './animation-snake';

export interface Anim {
    readonly type: AnimType;
    readonly frameInterval: number;
    isCompleted(): boolean;
    advance(): Anim;
    currentFrame(frameBuffer: Uint8Array): Frame;
}

export const enum AnimType {
    DUMMY = 'animation - dummy',
    CONSOLE_START = 'animation - console start',
    GAME_SNAKE = 'animation - game snake',
    GAME_BOXER = 'animation - game boxer',
}

const emptyAnim: Anim = {
    type: AnimType.DUMMY,
    frameInterval: 1000,
    isCompleted: () => true,
    advance: () => emptyAnim,
    currentFrame: () => BLANK_FRAME,
};

export const Animations = Object.freeze({
    emptyAnim,
    consoleStartInitial: new ConsoleStartAnimation(),
    snakeInitial: new SnakeAnimation(),
    boxerInitial: emptyAnim,
});
