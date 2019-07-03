import React from 'react';
import Matrix from './Matrix';
import Dashboard from './Dashboard';
import styled from 'styled-components';
import {ScreenColors} from './screenCss';

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
