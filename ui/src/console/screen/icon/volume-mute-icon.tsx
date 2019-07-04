import React from 'react';
import {ScreenColors} from '../screen-colors';
import styled from 'styled-components';

const svgPath = `M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03
 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zM461.64 256l45.64-45.64c6.3-6.3 6.3-16.52
  0-22.82l-22.82-22.82c-6.3-6.3-16.52-6.3-22.82 0L416 210.36l-45.64-45.64c-6.3-6.3-16.52-6.3-22.82 0l-22.82
   22.82c-6.3 6.3-6.3 16.52 0 22.82L370.36 256l-45.63 45.63c-6.3 6.3-6.3 16.52 0 22.82l22.82 22.82c6.3 6.3 16.52
    6.3 22.82 0L416 301.64l45.64 45.64c6.3 6.3 16.52 6.3 22.82 0l22.82-22.82c6.3-6.3 6.3-16.52 0-22.82L461.64 256z`;

export const StyledSvg = styled.svg`
  width: 18px;
  height: 18px;
`;

interface Props {
    activated: boolean;
}

export class VolumeMuteIcon extends React.PureComponent<Props, {}> {
    public render(): React.ReactNode {
        return (
            <StyledSvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
                <path fill={this.props.activated ? ScreenColors.active : ScreenColors.deactivated} d={svgPath}/>
            </StyledSvg>
        );
    }
}