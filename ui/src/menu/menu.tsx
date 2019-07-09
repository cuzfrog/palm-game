import React from 'react';
import styled from 'styled-components';
import { Information } from './Information';

const LayoutWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 100;
`;

export default class Menu extends React.PureComponent {
  public render() {
    return (
      <LayoutWrapper>
        <Information />
      </LayoutWrapper>
    );
  }
}
