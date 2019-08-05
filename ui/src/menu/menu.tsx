import React from 'react';
import styled from 'styled-components';
import { Connects } from '../store';
import autoBind from 'auto-bind';
import MenuIcon from './menu-icon';
import { IconSvgPaths } from '../svg-path';

export interface MenuStateProps {
  infoExpanded: boolean;
  audioEnabled: boolean;
}

export interface MenuActionProps {
  toggleExpansion: (folded: boolean) => void;
  toggleAudio: (enabled: boolean) => void;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; 
  flex-direction: column;
  position: fixed;
  z-index: 100;
  width: ${(props: MenuStateProps) => props.infoExpanded ? '100%' : '56px'};
  height: ${(props: MenuStateProps) => props.infoExpanded ? '100%' : '56px'};
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

const StyledDiv = styled.div`
  color: #9c9c9c;
  font-size: 0.8em;
  font-family: monospace;
`;

const version: string = process.env.PACKAGE_VERSION as string;

type Props = MenuStateProps & MenuActionProps;

class Menu extends React.PureComponent<Props, {}> {
  constructor(props: Props) {
    super(props);
    autoBind.react(this);
  }

  public render() {
    const audioSvnPath = this.props.audioEnabled ? IconSvgPaths.audio : IconSvgPaths.mute;
    return (
      <Container {...this.props}>
        <IconContainer>
          <MenuIcon svgPath={IconSvgPaths.github} onClickHandler={this.openGithub} />
          <MenuIcon svgPath={audioSvnPath} onClickHandler={this.toggleAudio} size={22}/>
          <MenuIcon svgPath={IconSvgPaths.question} onClickHandler={this.toggleInfo} />
        </IconContainer>
        {this.renderContent()}
      </Container>
    );
  }

  private toggleInfo() {
    this.props.toggleExpansion(!this.props.infoExpanded);
  }

  private openGithub() {
    window.open('https://github.com/cuzfrog/palm-game');
  }

  private toggleAudio() {
    this.props.toggleAudio(this.props.audioEnabled);
  }

  private renderContent() {
    if (this.props.infoExpanded) {
      return (
        <StyledDiv>
          <p>UI-version:{version}</p>
        </StyledDiv>
      );
    } else {
      return null;
    }
  }
}

export default Connects.connectToMenu(Menu);
