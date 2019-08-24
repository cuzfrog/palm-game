import { InitialConsoleStartAnimation } from "./animation-console-start";
import { InitialSnakeAnimation } from "./animation-snake";
import { InitialTetrisAnimation } from "./animation-tetris";
import { BLANK_FRAME } from "./graphic-types";

export interface Anim {
    readonly type: AnimType;
    readonly frameInterval: number;
    isCompleted(): boolean;
    advance(): Anim;
    currentFrame(frameBuffer: Uint8Array): Frame;
}

export const enum AnimType {
    DUMMY = "animation - dummy",
    CONSOLE_START = "animation - console start",
    GAME_SNAKE = "animation - game snake",
    GAME_TETRIS = "animation - game tetris",
    GAME_BOXER = "animation - game boxer",
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
    consoleStartInitial: InitialConsoleStartAnimation,
    snakeInitial: InitialSnakeAnimation,
    tetrisInitial: InitialTetrisAnimation,
});
