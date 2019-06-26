import * as React from 'react';
import styled from 'styled-components';

interface Props {
    version: string;
}

class _Information extends React.PureComponent<Props, {}> {
    public render() {
        return (
            <div>
                <span>Ver {this.props.version}</span>
            </div>
        );
    }
}

export const Information = styled(_Information)`
  color: #9c9c9c;
  font-size: 0.8em;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 100;
  font-family: monospace;
`;
