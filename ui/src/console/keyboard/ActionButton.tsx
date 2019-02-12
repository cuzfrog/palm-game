import React from 'react';
import {Action, Dispatch} from 'redux';
import Button, {BtnType} from './Button';
import {connect} from 'react-redux';
import throttle from 'lodash.throttle';

const DEFAULT_THROTTLE_INTERVAL = 100; // ms

interface ConnectedComponent<T> {
    dispatch: Dispatch<Action<T>>;
}

interface Props<T> extends ConnectedComponent<T> {
    readonly type: BtnType;
    readonly caption?: string;
    readonly action: Action<T>;
    readonly throttleIntervalMs?: number;
}

function ActionButton<T>(props: Props<T>) {
    const throttleInterval = props.throttleIntervalMs ? props.throttleIntervalMs : DEFAULT_THROTTLE_INTERVAL;

    function fireOn() {
        intervalHandle.push(window.setInterval(throttledDispatch, throttleInterval));
    }

    function fireOff() {
        intervalHandle.forEach(window.clearInterval);
    }

    const intervalHandle: number[] = [];
    const throttledDispatch = throttle(() => props.dispatch(props.action), throttleInterval, {trailing: false});

    return (
        <Button
            type={props.type}
            caption={props.caption}
            clickHandler={throttledDispatch}
            downHandler={fireOn}
            upHandler={fireOff}
        />
    );
}

export default connect()(ActionButton);
