import React from 'react';
import styles from './Digit.less';
import {Error} from 'tslint/lib/error';

export interface DigitProps {
    width: number;
}

const MAX_WIDTH = 12;

export default class extends React.PureComponent<DigitProps, {}> {
    constructor(props: DigitProps) {
        super(props);
        if (props.width > MAX_WIDTH) {
            throw new Error('Digit width must be <=12 and >0.');
        }
        this.backgroundDigits = this.backgroundDigits.bind(this);
    }

    public render() {
        return (
            <div className={styles.digit}>
                <p className={styles.foreground}>12345</p>
                <p className={styles.background}>{this.backgroundDigits()}</p>
            </div>
        );
    }

    private backgroundDigits() {
        let n = 8;
        for (let i = 1; i < this.props.width; i++) {
            n = n + 8 * Math.pow(10, i);
        }
        return n;
    }
}
