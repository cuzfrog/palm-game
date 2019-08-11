import React from 'react';
import { PixelState } from 'src/domain';
import styled, { css, keyframes } from 'styled-components';
import { ScreenColors } from './screen-colors';

interface Props {
  value: PixelState;
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

const twinkleStyle = css`
  ${deactivatedStyle};
  animation-iteration-count: infinite;
  animation-name: ${keyframe};
  animation-duration: 1s;
`;

const Pixel: import('styled-components').StyledComponent<'td', any, Props> = styled.td`
  display: inline-block;
  width: 12px;
  height: 12px;
  padding: 2px;
  border: 2px solid;
  box-shadow: inset 0 0 0 2px ${ScreenColors.background};
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
  }
}

export default React.memo(Pixel);
