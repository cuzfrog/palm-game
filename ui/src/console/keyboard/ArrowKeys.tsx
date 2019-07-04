import React from 'react';
import {BtnType} from './button';
import Button from './ActionButton';
import styled from 'styled-components';
import {KeysContainer} from './keys-container';
import {ButtonStyles} from './button-styles';

interface Props {
    readonly upAction: () => void;
    readonly rightAction: () => void;
    readonly downAction: () => void;
    readonly leftAction: () => void;
}

const baseTop = ButtonStyles.arrayKeySize * 1.2;
const baseLeft = ButtonStyles.arrayKeySize * 1.2;
const UpKeyContainer = styled.div`
  left: ${baseLeft}px;
`;
const RightKeyContainer = styled.div`
  top: ${baseTop}px;
  left: ${baseLeft * 2.1}px;
`;
const DownKeyContainer = styled.div`
  top: ${baseTop * 2}px;
  left: ${baseLeft}px;
`;
const LeftKeyContainer = styled.div`
  top: ${baseTop}px;
`;

export default class extends React.PureComponent<Props, {}> {
    public render() {
        return (
            <KeysContainer>
                <UpKeyContainer><Button type={BtnType.UP} action={this.props.upAction}/></UpKeyContainer>
                <RightKeyContainer><Button type={BtnType.RIGHT} action={this.props.rightAction}/></RightKeyContainer>
                <DownKeyContainer><Button type={BtnType.DOWN} action={this.props.downAction}/></DownKeyContainer>
                <LeftKeyContainer><Button type={BtnType.LEFT} action={this.props.leftAction}/></LeftKeyContainer>
            </KeysContainer>
        );
    }
}
