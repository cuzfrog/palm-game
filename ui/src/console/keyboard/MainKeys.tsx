import React from 'react';
import styles from './KeysLayout.less';
import Button from './ActionButton';
import {BtnType} from './Button';

interface MainKeysProps {
    readonly actionA: () => void;
    readonly actionB: () => void;
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
