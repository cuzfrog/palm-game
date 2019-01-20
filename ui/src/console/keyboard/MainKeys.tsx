import React from 'react';
import styles from './KeysLayout.less';
import Button, {BtnType} from './Button';

export default class extends React.PureComponent<{}, {}> {
    public render() {
        return (
            <div className={styles.keysContainer}>
                <div className={styles.mainKeyA}><Button type={BtnType.MAIN} caption={'A'}/></div>
                <div className={styles.mainKeyB}><Button type={BtnType.MAIN} caption={'B'}/></div>
            </div>
        );
    }
}