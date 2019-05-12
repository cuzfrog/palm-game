import {List, Range} from 'immutable';
import {AppState, SnakeGameState} from '..';
import {Frame, GameType, PixelState, Point, SystemStatus} from '../../domain';
import {Specs} from '../../Specs';
import {AnimType} from './animations';

const I = PixelState.ON;
const O = PixelState.OFF;
const S = PixelState.TWINKLE;
const W = Specs.screen.graphicWidth;
const H = Specs.screen.graphicHeight;
const L = W * H;
const BLANK_FRAME = Range(0, L).map(() => O).toList();

const frameBuffer: PixelState[] = Array(L);

function show(state: AppState): Frame {
    let frame: Frame = BLANK_FRAME;
    switch (state.core.status) {
        case SystemStatus.MENU:
            const anim = state.core.anim;
            switch (anim.type) {
                case AnimType.CONSOLE_START:
                    frame = consoleStartAnimFrame(anim.step);
                    break;
                case AnimType.GAME_SNAKE:
                    frame = snakeGameAnimFrame(anim.step);
                    break;
            }
            break;
        case SystemStatus.IN_GAME:
            switch (state.core.gameType) {
                case GameType.SNAKE:
                    frame = snakeGameFrame(state.snake);
                    break;
                default:
                    throw new TypeError('Unknow gameType:' + state.core.gameType);
            }
            if (state.core.inGamePaused) {
                frame = pauseIndication(frame);
            }
    }
    return frame;
}

function validateFrame(frame: Frame): boolean {
    return L !== frame.size;
}

const borderFrame = Range(0, L).map(i => {
    if (i <= W || i % W === 0 || (i + 1) % W === 0 || i > L - W) {
        return I;
    } else {
        return O;
    }
}).toList();

function snakeGameFrame(state: SnakeGameState): Frame {
    borderFrame.forEach((v, i) => frameBuffer[i] = v);
    state.body.forEach(p => {
        frameBuffer[toIndex(p)] = I;
    });
    if (state.bean) {
        frameBuffer[toIndex(state.bean)] = S;
    }
    if (state.hole) {
        frameBuffer[toIndex(state.hole)] = O;
    }
    const frame = List(frameBuffer);
    if (validateFrame(frame)) {
        throw Error(`Bad frame, current state: ${state}`);
    }
    return frame;
}

function consoleStartAnimFrame(step: number): Frame {
    for (let i = L - 1, j = W * step; i >= 0; i--, j--) {
        frameBuffer[i] = j > 0 ? I : O;
    }
    const frame = List(frameBuffer);
    if (validateFrame(frame)) {
        throw Error(`Bad frame from console start anim, current step: ${step}`);
    }
    return frame;
}

function snakeGameAnimFrame(step: number): Frame {
    return BLANK_FRAME; // todo: impl
}

function toIndex(p: Point): number {
    return p.y * W + p.x;
}

function pauseIndication(frame: Frame): Frame {
    return frame.map(s => s === I ? S : O);
}

export const Graphic = {
    show: (state: AppState) => show(state)
};
