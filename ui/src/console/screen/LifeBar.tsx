import React from 'react';
import styles from './LifeBar.less';

const WIDTH: number = 5;

interface LifeBarProps {
    readonly hp: number;
    readonly maxHp: number;
}

export default class LifeBar extends React.PureComponent<LifeBarProps, {}> {
    constructor(props: Readonly<LifeBarProps>) {
        super(props);
        if (props.maxHp <= 0) {
            throw new RangeError(`Life bar maxHp must be >0. But it's set to ${props.maxHp}.`);
        }
    }

    public render() {
        return (
            <div className={styles.lifeBar}>
                {renderHearts(this.props)}
            </div>
        );
    }
}

function renderHearts(props: Readonly<LifeBarProps>) {
    const activeCnt = (props.hp / props.maxHp) * WIDTH;
    return [...Array(WIDTH).keys()].map((i) =>
        (<div className={i <= activeCnt ? styles.activeHeart : styles.heart} key={i}/>)
    );
}
