import React from 'react';
import styles from './Dashboard.less';
import Digit, {FontSize} from './digits/Digit';
import classnames from 'classnames';
import LifeBar from './LifeBar';
import {Life} from '../../domain';
import {AppState} from '../../store';
import {connect} from 'react-redux';

const SCORE_WIDTH = 7;
const LEVEL_WIDTH = 1;
const LIFE_HEART_COUNT = 10;

interface Props {
    readonly score: number;
    readonly level: number;
    readonly life: Life;
    readonly enemyLife: Life;
}

class Dashboard extends React.PureComponent<Props, {}> {
    public render() {
        const enemyLife = getLife(this.props.enemyLife);
        const life = getLife(this.props.life);

        return (
            <div className={styles.dashboard}>
                <div className={styles.scoreShow}>
                    <p>Scores</p>
                    <Digit value={this.props.score} width={SCORE_WIDTH} fontSize={FontSize.NORMAL}/>
                </div>
                <div className={styles.levelShow}>
                    <p>Level</p>
                    <Digit value={this.props.level} width={LEVEL_WIDTH} fontSize={FontSize.LARGE}/>
                </div>

                <div className={classnames(styles.lifeShow, {[styles.disabled]: this.props.enemyLife})}>
                    <p>Enemy</p>
                    <LifeBar hp={enemyLife.hp} maxHp={enemyLife.maxHp} count={LIFE_HEART_COUNT}/>
                </div>

                <div className={classnames(styles.lifeShow, {[styles.disabled]: this.props.life})}>
                    <p>Life</p>
                    <LifeBar hp={life.hp} maxHp={life.maxHp} count={LIFE_HEART_COUNT}/>
                </div>

            </div>
        );
    }
}

function getLife(life?: Life) {
    if (life === undefined) {
        return {hp: 0, maxHp: 1};
    } else {
        return life;
    }
}

function mapStateToProps(state: AppState): Props {
    return {
        score: state.sys.scores.get(state.sys.gameType, 0),
        level: state.sys.level,
        life: state.core.life,
        enemyLife: state.core.enemyLife,
    };
}

export default connect(mapStateToProps)(Dashboard); // todo: connect to every indicator?
