import React from 'react';
import styled from 'styled-components';
import {ScreenColors} from './screenCss';

interface Props {
    readonly hp: number;
    readonly maxHp: number;
    readonly count: number;
}

interface HeartProps {
    readonly isActive: boolean;
}

const heartSize = 10;

const LifeBarWrapper = styled.div`
  overflow: auto;
`;

const Heart = styled.div`
    display: inline-block;
    margin: 2px;
    position: relative;
    width: ${heartSize}px;
    height: ${heartSize}px;
    float: left;
    
    &:before, &:after {
      position: absolute;
      content: "";
      left: ${heartSize / 2}px;
      top: 0;
      width: ${heartSize / 2}px;
      height: ${heartSize}px;
      background: ${(props: HeartProps) => props.isActive ? ScreenColors.active : ScreenColors.deactivated};
      border-radius: ${heartSize / 2} ${heartSize}/2 0 0;
      transform: rotate(-45deg);
      transform-origin: 0 100%;
    }
    &:after {
      left: 0;
      transform: rotate(45deg);
      transform-origin: 100% 100%;
    }
`;

export default class LifeBar extends React.PureComponent<Props, {}> {
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
            <LifeBarWrapper>
                {renderHearts(this.props)}
            </LifeBarWrapper>
        );
    }
}

// todo: optimize
function renderHearts(props: Readonly<Props>) {
    const deActiveCnt = props.maxHp <= 0 ? props.count : (1 - props.hp / props.maxHp) * props.count;
    return [...Array(props.count).keys()].map(i => (<Heart isActive={deActiveCnt <= i} key={i}/>));
}
