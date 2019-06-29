import * as React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  color: #9c9c9c;
  font-size: 0.8em;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 100;
  font-family: monospace;
`;

interface Props {
    version: string;
}

export class Information extends React.PureComponent<Props, {}> {
    public render() {
        return (
            <StyledDiv>
                <span>Ver {this.props.version}</span>
            </StyledDiv>
        );
    }
}
