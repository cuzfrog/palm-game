import React from 'react';
import {connect} from 'react-redux';
import classnames from 'classnames';
import styles from './Screen.less';
import Matrix from './Matrix';
import Digit, {FontSize} from './digits/Digit';
import LifeBar from './LifeBar';
import {AppState} from '../../store';
import {List} from 'immutable';

const I = true;
const O = false;

const SCORE_WIDTH = 8;
const LEVEL_WIDTH = 2;
const LIFE_HEART_COUNT = 10;

interface Props {
    readonly score: number;
    readonly level: number;
    readonly matrix: List<boolean>;
    readonly isMatrixUpdated: boolean;
    readonly life?: Life;
    readonly enemyLife?: Life;
}

interface Life {
    readonly hp: number;
    readonly maxHp: number;
}

class Screen extends React.PureComponent<Props, {}> {
    public render() {
        const enemyLife = getLife(this.props.enemyLife);
        const life = getLife(this.props.life);

        return (
            <div className={styles.screen}>
                <div className={styles.matrixArea}>
                    <Matrix  actives={this.props.matrix}/>
                </div>
                <div className={styles.indicationArea}>
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
        score: state.system.score,
        level: state.system.level,
        matrix: mockMatrix,
        isMatrixUpdated: false
    };
}

export default connect(mapStateToProps)(Screen);

const mockMatrix: List<boolean> = List.of(
    O, O, O, O, O, O, O, O, O, O,
    O, O, O, I, O, I, O, O, O, O,
    O, O, O, O, O, O, O, O, O, O,
);
