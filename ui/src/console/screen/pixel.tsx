import React from "react";
import { PixelState } from "src/domain";
import styled, { css, keyframes } from "styled-components";
import { ScreenColors } from "./screen-colors";

export type PixelSize = 6 | 12;

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

const Pixel: import("styled-components").StyledComponent<"td", any, Props> = styled.td`
  display: inline-block;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  padding: ${props => props.size / 6}px;
  border: ${props => props.size / 6}px solid;
  box-shadow: inset 0 0 0 ${props => props.size > 6 ? 2 : 0}px ${ScreenColors.background};
  margin: 1px;
  background-clip: content-box;
  ${(props: Props) => getPixelStyle(props.value)};
`;

function getPixelStyle(state: PixelState) {
  switch (state) {
    case PixelState.ON:
      return activeStyle;
    case PixelState.OFF:
      return deactivatedStyle;
    case PixelState.TWINKLE:
      return twinkleStyle;
    case PixelState.BLINK:
      return sparkStle;
  }
}

export default React.memo(Pixel);
