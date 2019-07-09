import React from 'react';
import styled from 'styled-components';
import { Information } from './Information';
import MenuIcon from './icon/menu-icon';

const LayoutWrapper = styled.div`
  position: fixed;
  align-content: right;
  z-index: 100;
  width: 100%;
  height: 18px;
  margin: 0;
  padding: 0;
  top:0;
  left:0;
  background: rgba(0, 0, 0, 0.5);
`;

export default class Menu extends React.PureComponent {
  public render() {
    return (
      <LayoutWrapper>
        <MenuIcon />
        <Information />
      </LayoutWrapper>
    );
  }
}
