import React from 'react';
import styles from './Keyboard.less';
import ArrowKeys from './ArrowKeys';
import FunctionKeys from './FunctionKeys';
import MainKeys from './MainKeys';
import {Connects} from '../../store/connects';

export interface KeyboardProps {
    readonly upAction: () => void;
    readonly rightAction: () => void;
    readonly downAction: () => void;
    readonly leftAction: () => void;

    readonly selectAction: () => void;
    readonly startAction: () => void;

    readonly actionA: () => void;
    readonly actionB: () => void;
}

class Keyboard extends React.PureComponent<KeyboardProps, {}> {
    constructor(props: KeyboardProps) {
        super(props);
    }

    public render() {
        return (
            <div className={styles.keyBoard}>
                <div className={styles.arrowKeysContainer}>
                    <ArrowKeys {...this.props}/></div>
                <div className={styles.funcKeysContainer}>
                    <FunctionKeys {...this.props}/></div>
                <div className={styles.mainKeysContainer}>
                    <MainKeys {...this.props}/></div>
            </div>
        );
    }
}

export default Connects.connectToKeyboard(Keyboard);
