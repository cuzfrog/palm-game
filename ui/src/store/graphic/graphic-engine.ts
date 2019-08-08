import { GameType, SystemStatus, GameStatus } from '../../domain';
import { BLANK_FRAME, I, L, O, S } from './graphic-types';
import { snakeGameFrame } from './graphic-snake';

const frameBuffer: Uint8Array = new Uint8Array(new ArrayBuffer(L));

function draw(state: AppState): Frame {
  let frame: Frame = BLANK_FRAME;
  switch (state.core.status) {
    case SystemStatus.STARTING:
    case SystemStatus.MENU:
      frame = state.core.anim.currentFrame(frameBuffer);
      break;
    case SystemStatus.IN_GAME:
      switch (state.core.gameType) {
        case GameType.SNAKE:
          frame = snakeGameFrame(state.snake, frameBuffer);
          break;
        default:
          throw new TypeError('Unknown gameType:' + state.core.gameType);
      }
      if (state.core.isPaused()) {
        frame = pauseIndication(frame);
      }
  }
  return frame;
}

function pauseIndication(frame: Frame): Frame {
  return frame.map(s => s === I ? S : O);
}

export const Graphic = {
  draw
};
