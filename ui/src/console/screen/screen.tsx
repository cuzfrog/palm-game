import React from 'react';
import Matrix from './matrix';
import Dashboard from './dashboard';
import styled from 'styled-components';
import {ScreenColors} from './screen-colors';

const ScreenWrapper = styled.div`
  flex: 100%;
  background: ${ScreenColors.background};
  padding: 4px;
  border: 1px solid #000;
  display: flex;
`;

export default class Screen extends React.PureComponent {
    public render() {
        return (
            <ScreenWrapper>
                <Matrix/>
                <Dashboard/>
            </ScreenWrapper>
        );
    }
}
