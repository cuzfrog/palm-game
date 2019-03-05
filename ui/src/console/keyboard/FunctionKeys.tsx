import React from 'react';
import {Action} from 'redux';
import styles from './KeysLayout.less';
import {BtnType} from './Button';
import Button from './ActionButton';

const FUNC_KEY_THROTTLE_INTERVAL = 300;

interface FuncKeysProps {
    readonly selectAction: Action;
    readonly startAction: Action;
}

export default class extends React.PureComponent<FuncKeysProps, {}> {
    public render() {
        return (
            <div className={styles.keysContainer}>
                <div className={styles.selectKey}>
                    <Button type={BtnType.FUNC} action={this.props.selectAction} throttleIntervalMs={FUNC_KEY_THROTTLE_INTERVAL}/>
                    <p>Select</p>
                </div>
                <div className={styles.startKey}>
                    <Button type={BtnType.FUNC} action={this.props.startAction} throttleIntervalMs={FUNC_KEY_THROTTLE_INTERVAL}/>
                    <p>Start</p>
                </div>
            </div>
        );
    }
}
