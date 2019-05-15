import {Frame} from '../../domain';

export interface Anim {
    readonly type: AnimType;
    readonly frameInterval: number;
    isCompleted(): boolean;
    advance(): Anim;
    currentFrame(): Frame;
}

export const enum AnimType {
    DUMMY = 'animation - dummy',
    CONSOLE_START = 'animation - console start',
    GAME_SNAKE = 'animation - game snake',
    GAME_BOXER = 'animation - game boxer',
}
