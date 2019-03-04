import React from 'react';
import {Action, Dispatch} from 'redux';
import {connect} from 'react-redux';
import throttle from 'lodash.throttle';
import {List} from 'immutable';
import Button, {BtnType} from './Button';
import autoBind from 'auto-bind';

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

interface State {
    readonly handles: List<number>;
}

class ActionButton<T> extends React.PureComponent<Props<T>, State> {

    private readonly throttleInterval: number;
    private readonly throttledDispatch: () => void;

    constructor(props: Props<T>) {
        super(props);
        this.throttleInterval = props.throttleIntervalMs ? props.throttleIntervalMs : DEFAULT_THROTTLE_INTERVAL;
        this.state = {handles: List()};
        this.throttledDispatch = throttle(() => this.props.dispatch(this.props.action), this.throttleInterval, {trailing: false});
        autoBind.react(this);
    }

    public render(): React.ReactNode {
        return (
            <Button
                type={this.props.type}
                caption={this.props.caption}
                clickHandler={this.throttledDispatch} // todo remove
                downHandler={this.fireOn}
                upHandler={this.fireOff}
            />
        );
    }

    private fireOn() {
        const handle = window.setInterval(this.throttledDispatch, this.throttleInterval);
        this.setState(prevState => ({handles: prevState.handles.push(handle)}));
    }

    private fireOff() {
        this.state.handles.forEach(window.clearInterval);
    }
}

export default connect()(ActionButton);
