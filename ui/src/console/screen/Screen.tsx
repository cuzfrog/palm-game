import React from 'react';
import styles from './Screen.less';
import Matrix from './Matrix';
import Digit from './digits/Digit';
import LifeBar from './LifeBar';

const I = true;
const O = false;

export default class Screen extends React.PureComponent<{}, {}> {
    public render() {

        const mockMarix = [
            [O, O, O, O, O, O, O, O, O, O],
            [O, O, O, I, O, I, O, O, O, O],
            [O, O, O, O, O, O, O, O, O, O],
        ];

        return (
            <div className={styles.screen}>
                <div className={styles.matrixArea}><Matrix actives={mockMarix}/></div>
                <div className={styles.indicationArea}>
                    <Digit value={1563} width={8}/>
                    <LifeBar hp={40} maxHp={200}/>
                </div>
            </div>
        );
    }
}
