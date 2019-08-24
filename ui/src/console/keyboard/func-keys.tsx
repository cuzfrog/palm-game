import React from "react";
import { BtnType } from "./button-styles";
import Button from "./action-button";
import KeysContainer from "./keys-container";
import styled, { css } from "styled-components";
import { Key } from "./key-code";

interface Props {
  selectAction: () => void;
  startAction: () => void;
}

const BaseFuncKeyCss = css`
  font-size: 12px;
  font-weight: bold;
  p {
    margin: 5px;
  }
`;

const SelectKeyContainer = styled.div`
  ${BaseFuncKeyCss};
`;
const StartKeyContainer = styled.div`
  ${BaseFuncKeyCss};
  left: 60px;
`;

export default class FuncKeys extends React.PureComponent<Props, {}> {
  public render() {
    return (
      <KeysContainer>
        <SelectKeyContainer>
          <Button type={BtnType.FUNC} action={this.props.selectAction} throttleIntervalMs={300} keyboardCode={Key.One} />
          <p>Select</p>
        </SelectKeyContainer>
        <StartKeyContainer>
          <Button type={BtnType.FUNC} action={this.props.startAction} throttleIntervalMs={300} keyboardCode={Key.Two} />
          <p>Start</p>
        </StartKeyContainer>
      </KeysContainer>
    );
  }
}
