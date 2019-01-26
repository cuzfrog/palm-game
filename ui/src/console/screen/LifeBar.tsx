import React from 'react';
import styles from './LifeBar.less';

const MAX_WIDTH: number = 10;

interface LifeBarProps {
    readonly value: number;
    readonly width: number;
}

export default class LifeBar extends React.PureComponent<LifeBarProps, {}> {
    constructor(props: Readonly<LifeBarProps>) {
        super(props);
        if (props.width > MAX_WIDTH) {
            throw new RangeError(`Life bar width must be <=${MAX_WIDTH} and >0.`);
        }
    }

    public render() {
        return (
            <div className={styles.lifeBar}>
                <div className={styles.foreground}></div>
            </div>
        );
    }


}
