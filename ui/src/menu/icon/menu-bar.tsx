import React from 'react';
import styled from 'styled-components';

const svgPath = `M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837
7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837
7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837
7.163 16 16 16z`;

interface Props {
  onClickHandler: () => void;
}

const StyledSvg = styled.svg`
  width: 36px;
  cursor: pointer;
`;

export default class MenuBar extends React.PureComponent<Props, {}> {
  public render(): React.ReactNode {
    return (
      <StyledSvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' onClick={this.props.onClickHandler}>
        <path fill={'rgba(255, 255, 255, 0.5)'} d={svgPath} />
      </StyledSvg>
    );
  }
}
