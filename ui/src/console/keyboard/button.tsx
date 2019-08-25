import React from "react";
import autoBind from "auto-bind";
import styled from "styled-components";
import { mapStyledButton } from "./button-styles";

type BtnType = import("./button-styles").BtnType;

interface Props {
  type: BtnType;
  caption?: string;
  downHandler?: () => void;
  upHandler?: () => void;
  actionHandler?: () => void;
  keyboardCode?: string;
}

const StyledButton = styled.div`
  ${(props: Props) => mapStyledButton(props.type)};
`;

export default class Button extends React.Component<Props, {}> {
  shouldComponentUpdate() {
    return false;
  }

  constructor(props: Props) {
    super(props);
    if (typeof props.downHandler !== typeof props.upHandler) {
      throw ReferenceError("downHandler and upHandler must be both absent or both present.");
    }
    autoBind.react(this);
    if (props.keyboardCode && props.actionHandler) {
      addKeyboardEventListener(props.keyboardCode, props.actionHandler);
    }
  }

  public render() {
    return (
      <StyledButton
        type={this.props.type}
        onMouseDown={this.handleDown}
        onMouseUp={this.handleUp}
        onClick={this.props.actionHandler}
        onTouchStart={this.handleTouch}
        onTouchEnd={this.preventTouchend}
      >
        {this.props.caption}
      </StyledButton>
    );
  }

  private preventTouchend(e: React.TouchEvent) {
    e.preventDefault();
    this.handleUp();
  }

  private handleTouch(e: React.TouchEvent) {
    if (this.props.actionHandler) {
      e.preventDefault();
      this.props.actionHandler();
      this.handleDown(e);
    }
  }

  private handleDown(e: React.SyntheticEvent) {
    if (this.props.downHandler) {
      e.preventDefault();
      this.props.downHandler();
      document.addEventListener("mouseup", this.handleUp);
    }
  }

  private handleUp() {
    if (this.props.upHandler) {
      document.removeEventListener("mouseup", this.handleUp);
      this.props.upHandler();
    }
  }
}

function addKeyboardEventListener(code: string, keypressHandler: () => void) {
  document.addEventListener("keypress", (ev: KeyboardEvent) => {
    if (ev.code === code) { keypressHandler(); }
  });
}
