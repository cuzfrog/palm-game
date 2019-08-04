import React from 'react';
import styled from 'styled-components';
import GithubIcon from './icon/github-icon';

interface Props {
  show: boolean;
}

const StyledDiv = styled.div`
  color: #9c9c9c;
  font-size: 0.8em;
  font-family: monospace;
`;

const version: string = process.env.PACKAGE_VERSION as string;

export class Information extends React.PureComponent<Props, {}> {
  public render() {
    if (this.props.show) {
      return (
        <StyledDiv>
          <GithubIcon/>
          <p>UI-version:{version}</p>
        </StyledDiv>
      );
    } else {
      return null;
    }
  }
}
