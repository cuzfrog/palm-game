import React from "react";
import styled from "styled-components";
import autoBind from "auto-bind";

const StyledDiv = styled.div`
  color: #9c9c9c;
  font-size: 0.8em;
  font-family: monospace;
`;

const version: string = process.env.PACKAGE_VERSION as string;

interface UiInfo {
  uiWidth: number;
  uiHeight: number;
}

type State = UiInfo;

export default class Info extends React.PureComponent<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = this.getUiInfo();
    autoBind.react(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateUiInfo);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateUiInfo);
  }

  public render() {
    return (
      <StyledDiv>
        <p>UI-version:{version}</p>
        <p>Author:Cause Chung</p>
        <p><span>window size:{this.state.uiWidth}x{this.state.uiHeight}</span></p>
      </StyledDiv>
    );
  }

  private updateUiInfo() {
    this.setState(this.getUiInfo());
  }

  private getUiInfo(): UiInfo {
    return {
      uiWidth: window.innerWidth,
      uiHeight: window.innerHeight
    };
  }
}
