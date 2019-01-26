import React from 'react';
import styles from './Digit.less';

interface DigitProps {
    readonly value: number;
    readonly width: number;
}

const MAX_WIDTH = 8;

export default class Digit extends React.PureComponent<DigitProps, {}> {
    private readonly backgroundDigits: number;

    constructor(props: DigitProps) {
        super(props);
        if (props.width > MAX_WIDTH) {
            throw new RangeError(`Digit width must be <=${MAX_WIDTH} and >0.`);
        }
        this.backgroundDigits = calculateBackgroundDigits(props.width);
    }

    public render() {
        return (
            <div className={styles.digit}>
                <p className={styles.foreground}>{Math.min(this.props.value, this.backgroundDigits)}</p>
                <p className={styles.background}>{this.backgroundDigits}</p>
            </div>
        );
    }
}

function calculateBackgroundDigits(width: number) {
    let n = 8;
    for (let i = 1; i < width; i++) {
        n = n + 8 * Math.pow(10, i);
    }
    return n;
}
