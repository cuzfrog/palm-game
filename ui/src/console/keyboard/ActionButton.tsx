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
    function handleClick() {
        props.dispatch(props.action);
    }

    return (
        <Button
            type={props.type}
            caption={props.caption}
            clickHandler={throttle(handleClick, props.throttleIntervalMs)}
        />
    );
}

export default connect()(ActionButton);
