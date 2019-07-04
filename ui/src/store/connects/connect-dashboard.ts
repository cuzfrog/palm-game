import {connect} from 'react-redux';
import {AppState} from '../app-state';
import {FULL_LIFE, GameType, Life, MINIMAL_LIFE, SystemStatus} from '../../domain';
import {DashboardProps} from '../../console';
import {Specs} from '../../specs';

function mapStateToProps(state: AppState): DashboardProps {
    let life: Life;
    let enemyLife: Life;
    let score = state.core.getScore();
    let level = state.core.getLevel();
    if (state.core.status === SystemStatus.STARTING) {
        life = FULL_LIFE;
        enemyLife = FULL_LIFE;
        score = all8digit(Specs.screen.scoreDigitMaxWidth);
        level = 8;
    } else if (state.core.status === SystemStatus.MENU) {
        life = MINIMAL_LIFE;
        enemyLife = MINIMAL_LIFE;
    } else {
        switch (state.core.gameType) {
            case GameType.SNAKE:
                life = {
                    hp: state.snake.life,
                    maxHp: 10,
                };
                enemyLife = MINIMAL_LIFE;
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
