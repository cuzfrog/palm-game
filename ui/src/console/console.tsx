import React from "react";
import Decorate from "./decorate";
import Screen from "./screen";
import Keyboard from "./keyboard";
import styled from "styled-components";
import rgb from "polished/lib/color/rgb";
import autoBind from "auto-bind";

const panelPrimary = "lightskyblue";
const panelBright = rgb(172, 222, 255);
const panelDark = "#5f92bd";

interface StyleProps {
  scale: number;
}

const ConsoleWrapper = styled.div`
  width: 480px;
  position: absolute;
  padding-top: 50px;
  z-index: -2;
  top:5px;

  background: ${panelPrimary};
  border: outset 3px ${panelPrimary};
  border-radius: 10px;

  user-select: none;

  transform: scale(${(props: StyleProps) => props.scale});
  transform-origin: top center;
`;

const UpperRect = styled.div`
  width: 380px;
  padding: 28px 0 16px;
  border: #000 solid;
  border-width: 0 6px 6px;
  margin: 0 auto;
  position: relative;
`;

const ScreenRect = styled.div`
  width: 340px;
  border: solid 5px;
  border-color: ${panelDark} ${panelBright} ${panelBright} ${panelDark};
  margin: 0 auto;
  position: relative;
  display: flex;
`;

const LowerRect = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 300px;
  position: relative;
  margin-top: 20px;
  padding: 20px;
  z-index: 1;
`;

type State = StyleProps;

export default class Console extends React.PureComponent<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = { scale: 1.0 };
    autoBind.react(this);
  }

  componentDidMount() {
    this.scaleUI();
    window.addEventListener("resize", this.scaleUI);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.scaleUI);
  }

  public render() {
    return (
      <ConsoleWrapper scale={this.state.scale} id="console">
        <UpperRect>
          <Decorate />
          <ScreenRect>
            <Screen />
          </ScreenRect>
        </UpperRect>
        <LowerRect>
          <Keyboard />
        </LowerRect>
      </ConsoleWrapper>
    );
  }

  private scaleUI() {
    const scale = Math.min(
      window.innerWidth / 500,
      window.innerHeight / 865
    );
    this.setState({ scale });
  }
}
