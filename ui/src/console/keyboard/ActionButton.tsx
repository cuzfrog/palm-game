import React from 'react';
import {Action, Dispatch} from 'redux';
import Button, {BtnType} from './Button';
import {connect} from 'react-redux';
import throttle from 'lodash.throttle';

interface ConnectedComponent<T> {
    dispatch: Dispatch<Action<T>>;
}

interface Props<T> extends ConnectedComponent<T> {
    readonly type: BtnType;
    readonly caption?: string;
    readonly action: Action<T>;
    readonly throttleIntervalMs: number;
}

function ActionButton<T>(props: Props<T>) {
    function fireOn() {
        intervalHandle = window.setInterval(throttledDispatch, props.throttleIntervalMs);
    }

    function fireOff() {
        window.clearInterval(intervalHandle);
    }

    let intervalHandle: number = -1;
    const throttledDispatch = throttle(() => props.dispatch(props.action), props.throttleIntervalMs, {trailing: false});

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
