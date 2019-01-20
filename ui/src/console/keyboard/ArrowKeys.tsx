import React from 'react';
import styles from './KeysLayout.less';
import Button, {BtnType} from './Button';

export default class extends React.PureComponent {
    public render() {
        return (
            <div className={styles.keysContainer}>
                <div className={styles.upKey}><Button type={BtnType.UP}/></div>
                <div className={styles.rightKey}><Button type={BtnType.RIGHT}/></div>
                <div className={styles.downKey}><Button type={BtnType.DOWN}/></div>
                <div className={styles.leftKey}><Button type={BtnType.LEFT}/></div>
            </div>
        );
    }
}
