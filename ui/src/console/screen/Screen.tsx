import React from 'react';
import {connect} from 'react-redux';
import styles from './Screen.less';
import Matrix from './Matrix';
import Digit, {FontSize} from './digits/Digit';
import LifeBar from './LifeBar';
import {GameType} from '../../store/types';
import {AppState} from '../../store';

const I = true;
const O = false;

interface Props {
    readonly gameType: GameType;
}

class Screen extends React.PureComponent<Props, {}> {
    public render() {

        return (
            <div className={styles.screen}>
                <div className={styles.matrixArea}>
                    <Matrix actives={mockMatrix}/>
                </div>
                <div className={styles.indicationArea}>
                    <div className={styles.scoreShow}>
                        <p>Scores</p>
                        <Digit value={1563} width={8} fontSize={FontSize.NORMAL}/>
                    </div>
                    <div className={styles.levelShow}>
                        <p>Level</p>
                        <Digit value={1} width={2} fontSize={FontSize.LARGE}/>
                    </div>

                    <div className={styles.lifeShow}>
                        <p>Enemy</p>
                        <LifeBar hp={40} maxHp={200} count={10}/>
                    </div>

                    <div className={styles.lifeShow}>
                        <p>Life</p>
                        <LifeBar hp={60} maxHp={200} count={10}/>
                    </div>

                </div>
            </div>
        );
    }
}

function mapStateToProps(state: AppState): Props {
    return {
        gameType: state.system.gameType
    };
}

export default connect(mapStateToProps)(Screen);

const mockMatrix = [
    [O, O, O, O, O, O, O, O, O, O],
    [O, O, O, I, O, I, O, O, O, O],
    [O, O, O, O, O, O, O, O, O, O],
];
