import React from 'react';
import styles from './KeysLayout.less';
import Button from './ActionButton';
import {BtnType} from './Button';
import {Action} from 'redux';

interface MainKeysProps {
    readonly actionA: Action;
    readonly actionB: Action;
}

export default class extends React.PureComponent<MainKeysProps, {}> {
    public render() {
        return (
            <div className={styles.keysContainer}>
                <div className={styles.mainKeyA}>
                    <Button type={BtnType.MAIN} caption={'A'} action={this.props.actionA} throttleIntervalMs={200}/>
                </div>
                <div className={styles.mainKeyB}>
                    <Button type={BtnType.MAIN} caption={'B'} action={this.props.actionB} throttleIntervalMs={200}/>
                </div>
            </div>
        );
    }
}
