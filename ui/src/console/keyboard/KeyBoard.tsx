import React from 'react';
import styles from './KeyBoard.less';
import ArrowKeys from './ArrowKeys';
import FunctionKeys from './FunctionKeys';
import MainKeys from './MainKeys';

export default class extends React.PureComponent {
    public render() {
        return (
            <div className={styles.keyBoard}>
                <div className={styles.arrowKeysContainer}><ArrowKeys/></div>
                <div className={styles.funcKeysContainer}><FunctionKeys/></div>
                <div className={styles.mainKeysContainer}><MainKeys/></div>
            </div>
        );
    }
}
