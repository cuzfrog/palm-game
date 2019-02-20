import React from 'react';
import styles from './LifeBar.less';
import {AppState} from '../../store';
import {connect} from 'react-redux';

const LIFE_HEART_COUNT = 10;

interface Props {
    readonly hp: number;
    readonly maxHp: number;
    readonly count: number;
}

class LifeBar extends React.PureComponent<Props, {}> {
    constructor(props: Readonly<Props>) {
        super(props);
        if (props.maxHp <= 0) {
            throw new RangeError(`Life bar maxHp must be > 0. But it's set to ${props.maxHp}.`);
        }
        if (props.count <= 0) {
            throw new RangeError(`Life bar width must be > 0. But it's set to ${props.count}.`);
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

// todo: optimize
function renderHearts(props: Readonly<Props>) {
    const deActiveCnt = (1 - props.hp / props.maxHp) * props.count;
    return [...Array(props.count).keys()].map((i) =>
        (<div className={i <= deActiveCnt ? styles.heart : styles.activeHeart} key={i}/>)
    );
}

function mapStateToProps(state: AppState): Props {
    return {
        hp: state.core.hp,
        maxHp: state.core.maxHp,
        count: LIFE_HEART_COUNT
    };
}

const areStatesEqual = (prevState: AppState, state: AppState) =>
    prevState.core.hp === state.core.hp && prevState.core.maxHp === state.core.maxHp;

export default connect(mapStateToProps, undefined, undefined, {areStatesEqual})(LifeBar);
