import React from "react";
import {ScreenColors} from "../screen-colors";
import styled from "styled-components";
import { IconSvgPaths } from "src/svg-path";

const svgPath = IconSvgPaths.mute;

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
            <StyledSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path fill={this.props.activated ? ScreenColors.active : ScreenColors.deactivated} d={svgPath}/>
            </StyledSvg>
        );
    }
}
