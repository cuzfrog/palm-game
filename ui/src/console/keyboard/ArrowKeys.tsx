import React from 'react';
import styles from './ArrowKeys.less';
import Button, {BtnType} from './Button';

export default class extends React.PureComponent {
    public render() {
        return (
            <div className={styles.arrowKeysContainer}>
                <div className={styles.upKeyPos}><Button type={BtnType.UP}/></div>
                <div className={styles.rightKeyPos}><Button type={BtnType.RIGHT}/></div>
                <div className={styles.downKeyPos}><Button type={BtnType.DOWN}/></div>
                <div className={styles.leftKeyPos}><Button type={BtnType.LEFT}/></div>
            </div>
        );
    }
}
