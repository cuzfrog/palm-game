import React from 'react';
import ArrowKeys from './arrow-keys';
import FunctionKeys from './func-keys';
import MainKeys from './main-keys';
import { Connects } from 'src/store/connects';
import styled from 'styled-components';

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

class Keyboard extends React.PureComponent<KeyboardProps, {}> {
  constructor(props: KeyboardProps) {
    super(props);
  }

  public render() { // todo: try to remove container
    return (
      <KeyboardWrapper>
        <ArrowKeysContainer><ArrowKeys {...this.props} /></ArrowKeysContainer>
        <FuncKeysContainer><FunctionKeys {...this.props} /></FuncKeysContainer>
        <MainKeysContainer><MainKeys {...this.props} /></MainKeysContainer>
      </KeyboardWrapper>
    );
  }
}

export default Connects.connectToKeyboard(Keyboard);
