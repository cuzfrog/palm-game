import React from 'react';
import styles from './Digit.less';
import {Specs} from '../../../Specs';

interface DigitProps {
    readonly value: number;
    readonly width: number;
    readonly fontSize: FontSize;
}

export enum FontSize {
    NORMAL = styles.normalSizeFont,
    LARGE = styles.largeSizeFont
}

const MAX_WIDTH = Specs.screen.scoreDigitMaxWidth;

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
            <div className={`${styles.digit} ${this.props.fontSize}`}>
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
