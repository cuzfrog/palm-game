import {List, Range} from 'immutable';
import {AppState, SnakeGameState} from '.';
import {GameType, PixelState, SystemStatus} from '../domain';
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

function validateFrame(frame: Frame): Frame {
    if (requiredLength !== frame.size) {
        throw Error('Bad frame!');
    }
    return frame;
}

function snakeGameFrame(state: SnakeGameState): Frame {
    frameBuffer.fill(O);
    state.body.forEach(p => {
        frameBuffer[p.y * W + p.x] = I;
    });
    if (state.bean) {
        const b = state.bean;
        frameBuffer[b.y * W + b.x] = S;
    }
    return List(frameBuffer);
}

function pauseIndication(frame: Frame): Frame {
    return frame.map(s => s === I ? S : O);
}

export const Graphic = {
    show: (state: AppState) => validateFrame(show(state))
};