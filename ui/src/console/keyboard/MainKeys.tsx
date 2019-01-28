import React from 'react';
import styles from './KeysLayout.less';
import Button from './ActionButton';
import {BtnType} from './Button';

export default class extends React.PureComponent<{}, {}> {
    public render() {
        return (
            <div className={styles.keysContainer}>
                <div className={styles.mainKeyA}>
                    <Button type={BtnType.MAIN} caption={'A'} action={{type: 'SYSTEM_DECREASE_LEVEL'}} throttleIntervalMs={300}/>
                </div>
                <div className={styles.mainKeyB}>
                    <Button type={BtnType.MAIN} caption={'B'} action={{type: 'SYSTEM_INCREASE_LEVEL'}} throttleIntervalMs={300}/>
                </div>
            </div>
        );
    }
}
