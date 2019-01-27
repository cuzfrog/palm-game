import React from 'react';
import styles from './LifeBar.less';

interface LifeBarProps {
    readonly hp: number;
    readonly maxHp: number;
    readonly count: number;
}

export default class LifeBar extends React.PureComponent<LifeBarProps, {}> {
    constructor(props: Readonly<LifeBarProps>) {
        super(props);
        if (props.maxHp <= 0) {
            throw new RangeError(`Life bar maxHp must be >0. But it's set to ${props.maxHp}.`);
        }
        if (props.count <= 0) {
            throw new RangeError(`Life bar width must be >0. But it's set to ${props.count}.`);
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
    const deActiveCnt = (1 - props.hp / props.maxHp) * props.count;
    return [...Array(props.count).keys()].map((i) =>
        (<div className={i <= deActiveCnt ? styles.heart : styles.activeHeart} key={i}/>)
    );
}
