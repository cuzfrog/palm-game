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

const LayoutWrapper = styled.div`
  position: fixed;
  align-content: right;
  z-index: 100;
  width: ${(props: MenuStateProps) => props.expanded ? '100%' : '56px'};
  height: ${(props: MenuStateProps) => props.expanded ? '100%' : '56px'};
  margin: 0;
  padding: 0;
  top:0;
  right:0;
  ${(props: MenuStateProps) => props.expanded ? 'background-color:rgba(0,0,0,0.6)' : ''};
`;

type Props = MenuStateProps & MenuActionProps;

class Menu extends React.PureComponent<Props, {}> {
  constructor(props: Props) {
    super(props);
    autoBind.react(this);
  }

  public render() {
    return (
      <LayoutWrapper expanded={this.props.expanded}>
        <MenuBar onClickHandler={this.menuToggleHandler} />
        <Information show={this.props.expanded} />
      </LayoutWrapper>
    );
  }

  private menuToggleHandler() {
    this.props.toggleExpansion(!this.props.expanded);
  }
}

export default Connects.connectToMenu(Menu);
