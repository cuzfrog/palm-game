import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  color: #9c9c9c;
  font-size: 0.8em;
  font-family: monospace;
`;

const version: string = process.env.PACKAGE_VERSION as string;

export default class Info extends React.PureComponent {
  public render() {
    return (
      <StyledDiv>
        <p>UI-version:{version}</p>
        <p>Author:Cause Chung</p>
      </StyledDiv>
    );
  }
}
