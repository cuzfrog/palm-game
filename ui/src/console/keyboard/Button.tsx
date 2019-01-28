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

export default class extends React.PureComponent<Props, {}> {
    constructor(props: Props) {
        super(props);
    }

    public render() {
        return (
            <div
                className={this.props.type.toString()}
                onMouseDown={this.props.downHandler}
                onMouseUp={this.props.upHandler}
                onMouseLeave={this.props.upHandler}
                onClick={this.props.clickHandler}
            >
                {this.props.caption}
            </div>
        );
    }
}

