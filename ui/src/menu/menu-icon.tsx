import React from 'react';
import styled from 'styled-components';

const DEFAULT_SIZE = 24;

interface Props {
  size?: number;
  svgPath: string;
  onClickHandler: () => void;
}

const StyledSvg = styled.svg`
  width: ${getSize}px;
  cursor: pointer;
  margin: 3px;
`;

export default class MenuIcon extends React.PureComponent<Props, {}> {
  public render(): React.ReactNode {
    return (
      <StyledSvg onClick={this.props.onClickHandler} {...this.props} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
        <path fill={'rgba(255, 255, 255, 0.5)'} d={this.props.svgPath} />
      </StyledSvg>
    );
  }
}

function getSize(props: Props) {
  return props.size ? props.size : DEFAULT_SIZE;
}
