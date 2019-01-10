import React from 'react';
import style from './Button.less';

export interface BtnProps {
    readonly type: BtnType;
    readonly caption?: string;
    readonly downHandler?: (event: React.MouseEvent<HTMLInputElement>) => void;
    readonly upHandler?: (event: React.MouseEvent<HTMLInputElement>) => void;
    readonly clickHandler?: (event: React.MouseEvent<HTMLInputElement>) => void;
}

export enum BtnType {
    MAIN = style.mainButton,
    FUNC = style.funcButton,
    UP = style.upButton,
    LEFT = style.leftButton,
    RIGHT = style.rightButton,
    DOWN = style.downButton
}

export default class extends React.PureComponent<BtnProps, {}> {
    constructor(props: BtnProps) {
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
