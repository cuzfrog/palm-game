import React from 'react';
import autoBind from 'auto-bind';
import styled from 'styled-components';
import {mapStyledButton} from './button-styles';

type BtnType = import('./button-styles').BtnType;

interface Props {
    type: BtnType;
    caption?: string;
    downHandler?: () => void;
    upHandler?: () => void;
    clickHandler?: () => void;
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
