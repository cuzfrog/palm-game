import React from 'react';
import styles from './Keyboard.less';
import ArrowKeys from './ArrowKeys';
import FunctionKeys from './FunctionKeys';
import MainKeys from './MainKeys';
import {Action, Dispatch} from 'redux';
import {Connects} from '../../store/connects';
import autoBind from 'auto-bind';

export interface KeyboardProps {
    readonly upAction: Action;
    readonly rightAction: Action;
    readonly downAction: Action;
    readonly leftAction: Action;

    readonly selectAction: Action;
    readonly startAction: Action;

    readonly actionA: Action;
    readonly actionB: Action;

    readonly dispatch: Dispatch<Action>;
}

class Keyboard extends React.PureComponent<KeyboardProps, {}> {
    constructor(props: KeyboardProps) {
        super(props);
        autoBind.react(this);
    }

    public render() {
        return (
            <div className={styles.keyBoard}>
                <div className={styles.arrowKeysContainer}>
                    <ArrowKeys upAction={this.up} downAction={this.down} rightAction={this.right} leftAction={this.left}/></div>
                <div className={styles.funcKeysContainer}>
                    <FunctionKeys selectAction={this.select} startAction={this.start}/></div>
                <div className={styles.mainKeysContainer}>
                    <MainKeys actionA={this.a} actionB={this.b}/></div>
            </div>
        );
    }

    private up() {
        this.props.dispatch(this.props.upAction);
    }

    private down() {
        this.props.dispatch(this.props.downAction);
    }

    private right() {
        this.props.dispatch(this.props.rightAction);
    }

    private left() {
        this.props.dispatch(this.props.leftAction);
    }

    private select() {
        this.props.dispatch(this.props.selectAction);
    }

    private start() {
        this.props.dispatch(this.props.startAction);
    }

    private a() {
        this.props.dispatch(this.props.actionA);
    }

    private b() {
        this.props.dispatch(this.props.actionB);
    }
}

export default Connects.connectToKeyboard(Keyboard);
