import React from "react";
import {Specs} from "src/specs";
import styled from "styled-components";
import {ScreenColors} from "../screen-colors";
import DigitFont from "./sa-digital-number.ttf";

interface Props {
    value: number;
    width: number;
    fontSize: FontSize;
}

export const enum FontSize {
    NORMAL = 15,
    LARGE = 22
}

const MAX_WIDTH = Specs.screen.scoreDigitMaxWidth;

interface FontProps {
    fontSize: FontSize;
}

const FontWrapper = styled.div`
  font-family: 'sa-digital-number', serif;
  position: relative;
  margin: 5px 0 5px;
  font-size: ${(props: FontProps) => props.fontSize}px;
  height: ${(props: FontProps) => props.fontSize + 2}px;
  
  @font-face {
    font-family: 'sa-digital-number';
    src: url(${DigitFont});
  }
  
  p {
    position: absolute;
    margin: 0;
    top: 1px;
    right: 0;
    bottom: 1px;
  }
`;

const FontForeground = styled.p`
  color: ${ScreenColors.active};
  z-index: 2;
`;

const FontBackground = styled.p`
  color: ${ScreenColors.deactivated};
  z-index: 1;
`;

export default class Digit extends React.PureComponent<Props, {}> {
    private readonly backgroundDigits: number;

    constructor(props: Props) {
        super(props);
        if (props.width > MAX_WIDTH) {
            throw new RangeError(`Digit width must be <=${MAX_WIDTH} and >0.`);
        }
        this.backgroundDigits = calculateBackgroundDigits(props.width);
    }

    public render() {
        return (
            <FontWrapper fontSize={this.props.fontSize}>
                <FontForeground>{this.props.value}</FontForeground>
                <FontBackground>{this.backgroundDigits}</FontBackground>
            </FontWrapper>
        );
    }
}

function calculateBackgroundDigits(width: number) {
    let n = 8;
    for (let i = 1; i < width; i++) {
        n = n + 8 * Math.pow(10, i);
    }
    return n;
}
