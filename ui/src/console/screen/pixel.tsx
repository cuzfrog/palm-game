import React from "react";
import { PixelState } from "src/domain";
import styled, { css, keyframes } from "styled-components";
import { ScreenColors } from "./screen-colors";

export type PixelSize = 8 | 12;

interface Props {
  value: PixelState;
  size: PixelSize;
}

const deactivatedStyle = css`
    background: ${ScreenColors.deactivated};
    border-color: ${ScreenColors.deactivated};
`;

const activeStyle = css`
    background: ${ScreenColors.active};
    border-color: ${ScreenColors.active};
`;

const activeLightStyle = css`
    background: ${ScreenColors.activeLight};
`;

const keyframe = keyframes`
  50% {
    ${activeStyle}
  }
  100% {
    ${deactivatedStyle}
  }
`;

const animationCss = (dura: string) => css`
  ${deactivatedStyle};
  animation-iteration-count: infinite;
  animation-name: ${keyframe};
  animation-duration: ${dura};
`;

const twinkleStyle = animationCss("1s");
const sparkStle = animationCss("400ms");

const NormalStyle = css`
  padding: 2px;
  border: 2px solid;
  box-shadow: inset 0 0 0 2px ${ScreenColors.background};
  background-clip: content-box;
`;

const Pixel: import("styled-components").StyledComponent<"td", any, Props> = styled.td`
  display: inline-block;
  margin: 1px;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  ${props => props.size === 12 ? NormalStyle : undefined};
  ${(props: Props) => getPixelStyle(props.value, props.size)};
`;

function getPixelStyle(state: PixelState, size: PixelSize) {
  switch (state) {
    case PixelState.ON:
      return size === 12 ? activeStyle : activeLightStyle;
    case PixelState.OFF:
      return deactivatedStyle;
    case PixelState.TWINKLE:
      return twinkleStyle;
    case PixelState.BLINK:
      return sparkStle;
  }
}

export default React.memo(Pixel);
