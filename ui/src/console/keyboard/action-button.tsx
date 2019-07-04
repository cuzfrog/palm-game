import React from 'react';
import throttle from 'lodash.throttle';
import {List} from 'immutable';
import autoBind from 'auto-bind';
import Button, {BtnType} from './button';

const DEFAULT_THROTTLE_INTERVAL = 150; // ms

interface Props {
    readonly type: BtnType;
    readonly caption?: string;
    readonly action: () => void;
    readonly throttleIntervalMs?: number;
}

interface State {
    readonly handles: List<number>;
}

export default class ActionButton extends React.PureComponent<Props, State> {

    private readonly throttleInterval: number;
    private readonly throttledDispatch: () => void;

    constructor(props: Props) {
        super(props);
        this.throttleInterval = props.throttleIntervalMs ? props.throttleIntervalMs : DEFAULT_THROTTLE_INTERVAL;
        this.state = {handles: List()};
        this.throttledDispatch = throttle(this.props.action, this.throttleInterval, {trailing: false});
        autoBind.react(this);
    }

    public render(): React.ReactNode {
        return (
            <Button
                type={this.props.type}
                caption={this.props.caption}
                clickHandler={this.throttledDispatch}
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
        this.setState({handles: List()});
    }
}
