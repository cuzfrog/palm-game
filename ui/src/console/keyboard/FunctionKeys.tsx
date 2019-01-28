import React from 'react';
import styles from './KeysLayout.less';
import Button, {BtnType} from './Button';

export default class extends React.PureComponent {
    public render() {
        return (
            <div className={styles.keysContainer}>
                <div className={styles.selectKey}>
                    <Button type={BtnType.FUNC}/>
                    <p>Select</p>
                </div>
                <div className={styles.startKey}>
                    <Button type={BtnType.FUNC}/>
                    <p>Start</p>
                </div>
            </div>
        );
    }
}
