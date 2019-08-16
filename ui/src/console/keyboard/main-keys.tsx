import React from "react";
import Button from "./action-button";
import { BtnType } from "./button-styles";
import styled from "styled-components";
import KeysContainer from "./keys-container";
import { Key } from "./key-code";

interface Props {
  actionA: () => void;
  actionB: () => void;
}

const KeyAContainer = styled.div`
  left: 90px;
`;
const KeyBContainer = styled.div`
  top: 50px;
`;

class MainKeys extends React.PureComponent<Props, {}> {
  public render() {
    return (
      <KeysContainer>
        <KeyAContainer>
          <Button
            type={BtnType.MAIN}
            caption={"A"}
            action={this.props.actionA}
            throttleIntervalMs={100}
            keyboardCode={Key.BracketRight}
          />
        </KeyAContainer>
        <KeyBContainer>
          <Button
            type={BtnType.MAIN}
            caption={"B"}
            action={this.props.actionB}
            throttleIntervalMs={100}
            keyboardCode={Key.BracketLeft}
          />
        </KeyBContainer>
      </KeysContainer>
    );
  }
}

export default MainKeys;
