import React from 'react';
import autoBind from 'auto-bind';
import styled from 'styled-components';
import { mapStyledButton } from './button-styles';

type BtnType = import('./button-styles').BtnType;

interface Props {
  type: BtnType;
  caption?: string;
  downHandler?: () => void;
  upHandler?: () => void;
  clickHandler?: () => void;
  keyboardCode?: string;
}

interface State {
  active: boolean;
}

const StyledButton = styled.div`
  ${(props: Props) => mapStyledButton(props.type)};
`;

export default class Button extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    if (typeof props.downHandler !== typeof props.upHandler) {
      throw ReferenceError('downHandler and upHandler must be both absent or both present.');
    }
    autoBind.react(this);
    if (props.keyboardCode && props.clickHandler) {
      handleKeyboardEvent(props.keyboardCode, props.clickHandler);
    }
    this.state = { active: false }; // todo: use state to control css
  }

  public render() {
    return (
      <StyledButton type={this.props.type}
        onMouseDown={this.handleDown} onMouseUp={this.handleUp} onClick={this.props.clickHandler}
        onTouchStart={this.props.clickHandler}
      >
        {this.props.caption}
      </StyledButton>
    );
  }

  private handleDown() {
    if (this.props.downHandler) {
      this.props.downHandler();
      document.addEventListener('mouseup', this.handleUp);
    }
  }

  private handleUp() {
    if (this.props.upHandler) {
      document.removeEventListener('mouseup', this.handleUp);
      this.props.upHandler();
    }
  }
}

function handleKeyboardEvent(code: string, keypressHandler: () => void) {
  document.addEventListener('keypress', (ev: KeyboardEvent) => {
    if (ev.code === code) { keypressHandler(); }
  });
}
