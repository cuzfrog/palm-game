import React from 'react';
import styled from 'styled-components';
import { Information } from './Information';
import { Connects } from '../store';
import autoBind from 'auto-bind';
import MenuBar from './icon/menu-bar';

export interface MenuStateProps {
  expanded: boolean;
}

export interface MenuActionProps {
  toggleExpansion: (folded: boolean) => void;
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

type Props = MenuStateProps & MenuActionProps;

class Menu extends React.PureComponent<Props, {}> {
  constructor(props: Props) {
    super(props);
    autoBind.react(this);
  }

  public render() {
    return (
      <Container expanded={this.props.expanded}>
        <MenuBarLayout><MenuBar onClickHandler={this.menuToggleHandler}/></MenuBarLayout>
        <Information show={this.props.expanded} />
      </Container>
    );
  }

  private menuToggleHandler() {
    this.props.toggleExpansion(!this.props.expanded);
  }
}

export default Connects.connectToMenu(Menu);
