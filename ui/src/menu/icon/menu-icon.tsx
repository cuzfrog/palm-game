import React from 'react';
import styled from 'styled-components';

const svgPath = `M496 288H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h480c8.8 0 16-7.2
 16-16v-32c0-8.8-7.2-16-16-16zm0-128H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h480c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16z`;

export const StyledSvg = styled.svg`
  width: 18px;
  cursor: pointer;
`;

export default class MenuIcon extends React.PureComponent {
    public render(): React.ReactNode {
        return (
            <StyledSvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
                <path fill={'rgba(0, 0, 0, 0.5)'} d={svgPath}/>
            </StyledSvg>
        );
    }
}
