import React from 'react';
import styles from './Keyboard.less';
import ArrowKeys from './ArrowKeys';
import FunctionKeys from './FunctionKeys';
import MainKeys from './MainKeys';
import {Action} from 'redux';
import {Connects} from '../../store/connects';

export interface KeyboardProps {
    readonly upAction: Action;
    readonly rightAction: Action;
    readonly downAction: Action;
    readonly leftAction: Action;

    readonly selectAction: Action;
    readonly startAction: Action;

    readonly actionA: Action;
    readonly actionB: Action;
}

class Keyboard extends React.PureComponent<KeyboardProps, {}> {
    public render() {
        return (
            <div className={styles.keyBoard}>
                <div className={styles.arrowKeysContainer}><ArrowKeys {...this.props}/></div>
                <div className={styles.funcKeysContainer}><FunctionKeys {...this.props}/></div>
                <div className={styles.mainKeysContainer}><MainKeys {...this.props}/></div>
            </div>
        );
    }
}

export default Connects.connectToKeyboard(Keyboard);
