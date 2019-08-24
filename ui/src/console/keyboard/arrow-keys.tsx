import React from "react";
import { BtnType } from "./button-styles";
import Button from "./action-button";
import styled from "styled-components";
import KeysContainer from "./keys-container";
import { ButtonStyles } from "./button-styles";
import { Key } from "./key-code";

interface Props {
  upAction: () => void;
  rightAction: () => void;
  downAction: () => void;
  leftAction: () => void;
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
        <UpKeyContainer>
          <Button type={BtnType.UP} action={this.props.upAction} keyboardCode={Key.W} />
        </UpKeyContainer>
        <RightKeyContainer>
          <Button type={BtnType.RIGHT} action={this.props.rightAction} keyboardCode={Key.D} />
        </RightKeyContainer>
        <DownKeyContainer>
          <Button type={BtnType.DOWN} action={this.props.downAction} keyboardCode={Key.S} />
        </DownKeyContainer>
        <LeftKeyContainer>
          <Button type={BtnType.LEFT} action={this.props.leftAction} keyboardCode={Key.A} />
        </LeftKeyContainer>
      </KeysContainer>
    );
  }
}
