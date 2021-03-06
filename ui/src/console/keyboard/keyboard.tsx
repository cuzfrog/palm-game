import React from "react";
import ArrowKeys from "./arrow-keys";
import FunctionKeys from "./func-keys";
import MainKeys from "./main-keys";
import { Connects } from "src/store/connects";
import styled from "styled-components";

export interface KeyboardProps {
  readonly upAction: () => void;
  readonly rightAction: () => void;
  readonly downAction: () => void;
  readonly leftAction: () => void;

  readonly selectAction: () => void;
  readonly startAction: () => void;

  readonly actionA: () => void;
  readonly actionB: () => void;
}

export interface KeyboardThrottleProps {
  readonly mainAThrottleInterval?: number;
  readonly mainBThrottleInterval?: number;
}

const KeyboardWrapper = styled.div`
  position: relative;
  > div {
    position: absolute;
  }
`;

const ArrowKeysContainer = styled.div`
  top: 30px;
`;

const FuncKeysContainer = styled.div`
  left: 170px;
`;

const MainKeysContainer = styled.div`
  left: 220px;
  top: 30px;
`;

class Keyboard extends React.PureComponent<KeyboardProps & KeyboardThrottleProps, {}> {
  constructor(props: KeyboardProps) {
    super(props);
  }

  public render() { // todo: try to remove container
    const p = this.props;
    return (
      <KeyboardWrapper>
        <ArrowKeysContainer>
          <ArrowKeys upAction={p.upAction} rightAction={p.rightAction} downAction={p.downAction} leftAction={p.leftAction} />
        </ArrowKeysContainer>
        <FuncKeysContainer>
          <FunctionKeys selectAction={p.selectAction} startAction={p.startAction} />
        </FuncKeysContainer>
        <MainKeysContainer>
          <MainKeys
            actionA={p.actionA} actionB={p.actionB}
            throttleIntervalA={this.props.mainAThrottleInterval}
            throttleIntervalB={this.props.mainBThrottleInterval}
          />
        </MainKeysContainer>
      </KeyboardWrapper>
    );
  }
}

export default Connects.connectToKeyboard(Keyboard);
