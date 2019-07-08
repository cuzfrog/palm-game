import React from 'react';
import Console from '../console';
import {Information} from './Information';
import styled from 'styled-components';

const StyledAppWrapper = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
`;

export default class App extends React.PureComponent {
    private readonly version: string = process.env.PACKAGE_VERSION as string;

    public render() {
        return (
            <StyledAppWrapper>
                <Information version={this.version}/>
                <Console/>
            </StyledAppWrapper>
        );
    }
}
