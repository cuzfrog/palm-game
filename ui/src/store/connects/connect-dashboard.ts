import { connect } from 'react-redux';
import { GameType, Life, SystemStatus } from '../../domain';
import { Specs } from '../../specs';
import { createSelector } from 'reselect';

type P = import('../../console').DashboardProps;

const snakeLifeSelector = createSelector(
  (s: AppState) => s.snake.life,
  life => ({ hp: life, maxHp: 10 })
);

function mapStateToProps(state: AppState): P {
  let life: Life;
  let enemyLife: Life;
  let score = state.core.getScore();
  let level = state.core.getLevel();
  if (state.core.status === SystemStatus.STARTING) {
    life = Life.Full;
    enemyLife = Life.Full;
    score = all8digit(Specs.screen.scoreDigitMaxWidth);
    level = 8;
  } else if (state.core.status === SystemStatus.MENU) {
    life = Life.Minimal;
    enemyLife = Life.Minimal;
  } else {
    switch (state.core.gameType) {
      case GameType.SNAKE:
        life = snakeLifeSelector(state);
        enemyLife = Life.Minimal;
        break;
      case GameType.BOXER:
        throw new Error('Not implemented');
      default:
        throw new TypeError(`Illegal game type:${state.core.gameType}`);
    }
  }

  return {
    score,
    level,
    life,
    enemyLife,
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
