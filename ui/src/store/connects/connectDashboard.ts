import {connect} from 'react-redux';
import {AppState} from '../appState';
import {GameType, Life, MINIMAL_LIFE} from '../../domain';
import {DashboardProps} from '../../console';

function mapStateToProps(state: AppState): DashboardProps {
    let life: Life;
    let enemyLife: Life;
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

    return {
        score: state.core.scores.get(state.core.gameType, 0),
        level: state.core.level,
        life,
        enemyLife,
    };
}

export const connectToDashboard = connect(mapStateToProps);
