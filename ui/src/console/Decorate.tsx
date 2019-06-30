import React from 'react';
import styled from 'styled-components';

const DecorateWrapper = styled.div`

`;

const Title = styled.h1`
  position: absolute;
  width: 100%;
  text-align: center;
  font-weight: normal;
  top: -18px;
  left: 0;
  margin: 0;
  padding: 0;
  font-size: 36px;
`;

export default class Decorate extends React.PureComponent<{}, {}> {
    public render() {
        return (
            <DecorateWrapper>
                <Title>Palm Game</Title>
            </DecorateWrapper>
        );
    }
}
