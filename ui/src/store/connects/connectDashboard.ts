import {connect} from 'react-redux';
import {AppState} from '../appState';
import {GameType, Life, MINIMAL_LIFE} from '../../domain';

function mapStateToProps(state: AppState) {
    let life: Life;
    let enemyLife: Life;
    switch (state.core.gameType) {
        case GameType.SNAKE:
            life = state.snake.life;
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
