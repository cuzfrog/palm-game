import { connect } from "react-redux";
import { GameType, Life, SystemStatus, PixelState } from "src/domain";
import { Specs } from "src/specs";
import { createSelector } from "reselect";
import { Range } from "immutable";
import { Graphic } from "../graphic";

type P = import("src/console").DashboardProps;

const snakeLifeSelector = createSelector(
  (s: AppState) => s.snake.life,
  life => ({ hp: life, maxHp: 10 })
);

const SmallFrame = Object.freeze({
  allOff: Range(0, 8).map(() => PixelState.OFF).toList(),
  allOn: Range(0, 8).map(() => PixelState.ON).toList(),
});

function mapStateToProps(state: AppState): P {
  let life: Life = Life.Minimal;
  let enemyLife: Life = Life.Minimal;
  let score = state.core.getScore();
  let count = state.core.getCount();
  let level = state.core.getLevel();
  let smallFrame = SmallFrame.allOff;
  if (state.core.status === SystemStatus.STARTING) {
    life = Life.Full;
    enemyLife = Life.Full;
    score = all8digit(Specs.screen.scoreDigitMaxWidth);
    count = all8digit(Specs.screen.countDigitMaxWidth);
    smallFrame = SmallFrame.allOn;
    level = 8;
  } else if (state.core.status === SystemStatus.IN_GAME) {
    switch (state.core.gameType) {
      case GameType.SNAKE:
        life = snakeLifeSelector(state);
        break;
      case GameType.TETRIS:
        smallFrame = Graphic.drawTetrisSmallMatrix(state.tetris.nextBlock);
        break;
      default:
        throw new TypeError(`Illegal game type:${state.core.gameType}`);
    }
  }

  return {
    score,
    count,
    level,
    life,
    enemyLife,
    smallFrame,
    audioMuted: !state.core.audioEnabled,
  };
}

function all8digit(width: number) {
  let sum = 0;
  for (let i = 0; i < width; i++) {
    sum += Math.pow(10, i) * 8;
  }
  return sum;
}

export const connectToDashboard = connect(mapStateToProps);
