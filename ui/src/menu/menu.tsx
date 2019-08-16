import React from "react";
import styled from "styled-components";
import { Connects } from "../store";
import autoBind from "auto-bind";
import MenuIcon from "./menu-icon";
import { IconSvgPaths } from "../svg-path";
import Info from "./info";

export interface MenuStateProps {
  audioEnabled: boolean;
}

export interface MenuActionProps {
  toggleAudio: (enabled: boolean) => void;
}

interface State {
  infoExpanded: boolean;
}
const DEFAULT_STATE = { infoExpanded: false };

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; 
  flex-direction: column;
  position: fixed;
  z-index: 100;
  width: ${(props: State) => props.infoExpanded ? "100%" : "0"};
  height: ${(props: State) => props.infoExpanded ? "100%" : "0"};
  margin: 0;
  padding: 0;
  top:2px;
  right:2px;
  background-color:rgba(0,0,0,0.6);
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  position:absolute;
  right:0;
  top:0;
`;

type Props = MenuStateProps & MenuActionProps;

class Menu extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = DEFAULT_STATE;
    autoBind.react(this);
  }

  public render() {
    const audioSvnPath = this.props.audioEnabled ? IconSvgPaths.audio : IconSvgPaths.mute;
    return (
      <Container infoExpanded={this.state.infoExpanded} onClick={this.closeInfo}>
        <IconContainer>
          <MenuIcon svgPath={IconSvgPaths.github} onClickHandler={this.openGithub} />
          <MenuIcon svgPath={audioSvnPath} onClickHandler={this.toggleAudio} size={22} />
          <MenuIcon svgPath={IconSvgPaths.question} onClickHandler={this.toggleInfo} />
        </IconContainer>
        {this.state.infoExpanded ? <Info /> : null}
      </Container>
    );
  }

  private toggleInfo() {
    const nextState = { infoExpanded: !this.state.infoExpanded };
    this.setState(nextState);
  }

  private closeInfo() {
    if (this.state.infoExpanded) {
      this.setState(DEFAULT_STATE);
    }
  }

  private openGithub() {
    window.open("https://github.com/cuzfrog/palm-game");
  }

  private toggleAudio() {
    this.props.toggleAudio(this.props.audioEnabled);
  }
}

export default Connects.connectToMenu(Menu);
