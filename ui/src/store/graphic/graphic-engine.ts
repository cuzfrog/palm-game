import { GameType, SystemStatus } from "src/domain";
import { BLANK_FRAME, I, L, O, S, sL } from "./graphic-types";
import { snakeGameFrame } from "./graphic-snake";
import { tetrisGameFrame, tetrisSmallFrame } from "./graphic-tetris";
import { createSelector } from "reselect";
import { identity } from "src/utils";
import { Tetromino } from "../games";

const frameBuffer: Uint8Array = new Uint8Array(new ArrayBuffer(L));
const smallFrameBuffer: Uint8Array = new Uint8Array(new ArrayBuffer(sL));

function drawMatrix(state: AppState): Frame {
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
        case GameType.TETRIS:
          frame = tetrisGameFrame(state.tetris, frameBuffer);
          break;
        default:
          throw new TypeError("Unknown gameType:" + state.core.gameType);
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

export const Graphic = Object.freeze({
  drawMatrix,
  drawTetrisSmallMatrix: createSelector(identity, (t: Tetromino) => tetrisSmallFrame(t, smallFrameBuffer)),
});
