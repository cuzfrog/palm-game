import React from 'react';
import style from './Button.less';

interface Props {
    readonly type: BtnType;
    readonly caption?: string;
    readonly downHandler?: () => void;
    readonly upHandler?: () => void;
    readonly clickHandler?: () => void;
}

export enum BtnType {
    MAIN = style.mainButton,
    FUNC = style.funcButton,
    UP = style.upButton,
    LEFT = style.leftButton,
    RIGHT = style.rightButton,
    DOWN = style.downButton
}

export default class Button extends React.PureComponent<Props, {}> {
    constructor(props: Props) {
        super(props);
        if (typeof props.downHandler !== typeof props.upHandler) {
            throw ReferenceError('downHandler and upHandler must be both absent or both present.');
        }
        this.handleDown = this.handleDown.bind(this);
        this.handleUp = this.handleUp.bind(this);
    }

    public render() {
        return (
            <div
                className={this.props.type.toString()}
                onMouseDown={this.handleDown}
                onMouseUp={this.handleUp}
                onClick={this.props.clickHandler}
            >
                {this.props.caption}
            </div>
        );
    }

    private handleDown() {
        if (this.props.downHandler !== undefined) {
            this.props.downHandler();
            document.addEventListener('mouseup', this.handleUp);
        }
    }

    private handleUp() {
        if (this.props.upHandler !== undefined) {
            document.removeEventListener('mouseup', this.handleUp);
            this.props.upHandler();
        }
    }
}
