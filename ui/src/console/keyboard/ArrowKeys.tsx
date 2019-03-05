import React from 'react';
import styles from './KeysLayout.less';
import {BtnType} from './Button';
import Button from './ActionButton';
import {Action} from 'redux';

interface ArrowKeysProps {
    readonly upAction: Action;
    readonly rightAction: Action;
    readonly downAction: Action;
    readonly leftAction: Action;
}

export default class extends React.PureComponent<Readonly<ArrowKeysProps>, {}> {
    public render() {
        return (
            <div className={styles.keysContainer}>
                <div className={styles.upKey}><Button type={BtnType.UP} action={this.props.upAction}/></div>
                <div className={styles.rightKey}><Button type={BtnType.RIGHT} action={this.props.rightAction}/></div>
                <div className={styles.downKey}><Button type={BtnType.DOWN} action={this.props.downAction}/></div>
                <div className={styles.leftKey}><Button type={BtnType.LEFT} action={this.props.leftAction}/></div>
            </div>
        );
    }
}
