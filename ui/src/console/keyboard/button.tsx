import React from 'react';
import autoBind from 'auto-bind';
import styled from 'styled-components';
import {mapStyledButton} from './button-styles';

interface Props {
    readonly type: BtnType;
    readonly caption?: string;
    readonly downHandler?: () => void;
    readonly upHandler?: () => void;
    readonly clickHandler?: () => void;
}

export const enum BtnType {
    MAIN = 'main',
    FUNC = 'func',
    UP = 'up',
    LEFT = 'left',
    RIGHT = 'right',
    DOWN = 'down'
}

const StyledButton = styled.div`
  ${(props: Props) => mapStyledButton(props.type)};
`;

export default class Button extends React.PureComponent<Props, {}> {
    constructor(props: Props) {
        super(props);
        if (typeof props.downHandler !== typeof props.upHandler) {
            throw ReferenceError('downHandler and upHandler must be both absent or both present.');
        }
        autoBind.react(this);
    }

    public render() {
        return (
            <StyledButton
                type={this.props.type}
                onMouseDown={this.handleDown}
                onMouseUp={this.handleUp}
                onClick={this.props.clickHandler}
            >
                {this.props.caption}
            </StyledButton>
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
