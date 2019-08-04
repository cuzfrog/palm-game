import React from 'react';
import styled from 'styled-components';
import { Connects } from '../store';
import autoBind from 'auto-bind';
import MenuBar from './icon/menu-bar';
import GithubIcon from './icon/github-icon';
import { Toggle } from './toggle-button';

export interface MenuStateProps {
  expanded: boolean;
  audioEnabled: boolean;
}

export interface MenuActionProps {
  toggleExpansion: (folded: boolean) => void;
  toggleSound: (enabled: boolean) => void;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; 
  flex-direction: column;
  position: fixed;
  z-index: 100;
  width: ${(props: MenuStateProps) => props.expanded ? '100%' : '56px'};
  height: ${(props: MenuStateProps) => props.expanded ? '100%' : '56px'};
  margin: 0;
  padding: 0;
  top:0;
  right:0;
  ${(props: MenuStateProps) => props.expanded ? 'background-color:rgba(0,0,0,0.6)' : ''};
`;

const MenuBarLayout = styled.div`
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
    return (
      <Container {...this.props}>
        <MenuBarLayout><MenuBar onClickHandler={this.menuToggleHandler} /></MenuBarLayout>
        {this.renderContent()}
      </Container>
    );
  }

  private menuToggleHandler() {
    this.props.toggleExpansion(!this.props.expanded);
  }

  private renderContent() {
    if (this.props.expanded) {
      return (
        <StyledDiv>
          <GithubIcon />
          <p>UI-version:{version}</p>
          <Toggle label='Enable sound:' toggle={this.props.toggleSound} initChecked={this.props.audioEnabled} />
        </StyledDiv>
      );
    } else {
      return null;
    }
  }
}

export default Connects.connectToMenu(Menu);
