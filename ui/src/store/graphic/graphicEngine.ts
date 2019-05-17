import {List, Range} from 'immutable';
import {AppState, SnakeGameState} from '..';
import {Frame, GameType, PixelState, SystemStatus} from '../../domain';
import {BLANK_FRAME, I, L, O, S, W} from './graphicTypes';
import {toIndex, validateFrame} from './graphicUtils';

const frameBuffer: PixelState[] = Array(L);

function show(state: AppState): Frame {
    let frame: Frame = BLANK_FRAME;
    switch (state.core.status) {
        case SystemStatus.MENU:
            frame = state.core.anim.currentFrame(frameBuffer);
            break;
        case SystemStatus.IN_GAME:
            switch (state.core.gameType) {
                case GameType.SNAKE:
                    frame = snakeGameFrame(state.snake);
                    break;
                default:
                    throw new TypeError('Unknown gameType:' + state.core.gameType);
            }
            if (state.core.inGamePaused) {
                frame = pauseIndication(frame);
            }
    }
    return frame;
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

function pauseIndication(frame: Frame): Frame {
    return frame.map(s => s === I ? S : O);
}

export const Graphic = {
    show: (state: AppState) => show(state)
};
