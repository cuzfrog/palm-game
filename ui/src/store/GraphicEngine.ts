import {List, Range} from 'immutable';
import {AppState, SnakeGameState} from '.';
import {GameType, PixelState, Point, SystemStatus} from '../domain';
import {Specs} from '../Specs';

const I = PixelState.ON;
const O = PixelState.OFF;
const S = PixelState.TWINKLE;
const W = Specs.graphicWidth;
const H = Specs.graphicHeight;
type Frame = List<PixelState>;
const requiredLength = W * H;
const blankFrame = Range(0, requiredLength).map(() => O).toList();

const frameBuffer: PixelState[] = Array(requiredLength);

function show(state: AppState): Frame {
    let frame: Frame = blankFrame;
    switch (state.core.status) {
        case SystemStatus.MENU:
            frame = blankFrame;
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
    return requiredLength !== frame.size;
}

const borderFrame = Range(0, requiredLength).map(i => {
    if (i <= W || i % W === 0 || (i + 1) % W === 0 || i > requiredLength - W) {
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

function toIndex(p: Point): number {
    return p.y * W + p.x;
}

function pauseIndication(frame: Frame): Frame {
    return frame.map(s => s === I ? S : O);
}

export const Graphic = {
    show: (state: AppState) => show(state)
};
