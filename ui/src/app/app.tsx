import React from 'react';
import Console from '../console';
import Menu from '../menu/menu';
import styled from 'styled-components';

const StyledAppWrapper = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
`;

export default class App extends React.PureComponent {
    public render() {
        return (
            <StyledAppWrapper>
                {/* <Menu/> */}
                <Console/>
            </StyledAppWrapper>
        );
    }
}
