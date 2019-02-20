import React from 'react';
import styles from './Screen.less';
import Matrix from './Matrix';
import Dashboard from './Dashboard';

export default class Screen extends React.PureComponent<{}, {}> {
    public render() {

        return (
            <div className={styles.screen}>
                <Matrix/>
                <Dashboard/>
            </div>
        );
    }
}
