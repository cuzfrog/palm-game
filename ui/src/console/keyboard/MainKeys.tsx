import React from 'react';
import styles from './MainKeys.less';
import Button, {BtnType} from './Button';

export default class extends React.PureComponent<{}, {}> {
    public render() {
        return (
            <div className={styles.mainKeyContainer}>
                <div className={styles.mainKeyApos}><Button type={BtnType.MAIN} caption={'A'}/></div>
                <div className={styles.mainKeyBpos}><Button type={BtnType.MAIN} caption={'B'}/></div>
            </div>
        );
    }
}