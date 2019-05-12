import {Specs} from '../../Specs';

export interface Anim {
    readonly type: AnimType;
    readonly step: number;
    readonly completeStep: number;
    readonly frameInterval: number;
}

export const enum AnimType {
    DUMMY = 'animation - dummy',
    CONSOLE_START = 'animation - console start',
    GAME_SNAKE = 'animation - game snake',
    GAME_BOXER = 'animation - game boxer',
}

const emptyAnim: Anim = {
    type: AnimType.DUMMY,
    step: 0,
    completeStep: 0,
    frameInterval: 1000,
};

export const Animations = Object.seal({
    emptyAnim,
    consoleStartIntial: intialAnim(AnimType.CONSOLE_START, Specs.screen.graphicHeight + 3, 80),
    snakeInitial: intialAnim(AnimType.GAME_SNAKE, 100, 700),
    boxerInitial: intialAnim(AnimType.GAME_BOXER, 200, 1000),
});

function intialAnim(type: AnimType, completeStep: number, frameInterval: number): Anim {
    return {type, step: 0, completeStep, frameInterval};
}
