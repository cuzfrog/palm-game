import {css} from "styled-components";
import darken from "polished/lib/color/darken";
import lighten from "polished/lib/color/lighten";
import transparentize from "polished/lib/color/transparentize";

const BasicColor = Object.freeze({
    blue: "#108FE8",
    yellow: "#FFC334",
    red: "#E53030",
    green: "#0EC518",
    black: "#1b1b1b",
});

const btnColor = BasicColor.blue;

const Color = Object.freeze({
    darken40: darken(0.4, btnColor),
    transparentDarken40: transparentize(0.8, darken(0.4, btnColor)),
    darken20: darken(0.2, btnColor),
    darken13: darken(0.13, btnColor),
    darken10: darken(0.1, btnColor),
    lighten20: lighten(0.2, btnColor),
    lighten15: lighten(0.15, btnColor),
    transparentWhite : transparentize(0.83, "#ffffff")
});

const fissureBorder = `${BasicColor.black} solid 2px`;

const ButtonBasicCss = css`
  border: ${fissureBorder};
  cursor: pointer;
  display: inline-block;
  background: ${btnColor};
`;

const mainDiameter = 80;
const MainButtonCss = css`
  ${ButtonBasicCss};
  border-radius: 100%;
  box-shadow: 0 -2px 1px 2px ${Color.darken10} inset,
              0 4px 3px ${Color.transparentDarken40},
              0 4px 3px ${Color.transparentWhite} inset;

  height: ${mainDiameter}px;
  width: ${mainDiameter}px;
  margin: 20px;

  font-size: ${mainDiameter / 2}px;
  text-decoration: none;
  font-weight: bold;
  color: ${Color.darken20};
  text-shadow: 0 -2px 0 ${Color.darken20}, 0 1px 1px ${Color.lighten15};
  line-height: ${mainDiameter}px;
  text-align: center;
  &:active {
    box-shadow: 0 -2px 2px 2px ${Color.darken13} inset;
    text-shadow: 0 -2px 0 ${Color.darken20}, 0 1px 1px ${Color.lighten15};
  }
`;

const FuncButtonCss = css`
  ${ButtonBasicCss};
  border-radius: 7px;
  box-shadow: 0 -2px 1px 1px ${Color.darken10} inset,
              0 3px 3px ${Color.transparentDarken40},
              0 3px 2px ${Color.transparentWhite} inset;
  height: 12px;
  width: 40px;
  &:active {
    box-shadow: 0 -2px 2px 1px ${Color.darken13} inset;
  }
`;

const arrowSize = 45;
const triangleSize = Math.sqrt(arrowSize * arrowSize / 2) + 2;
const ArrowButtonCss = css`
  ${ButtonBasicCss};
  height: ${arrowSize}px;
  width: ${arrowSize}px;
  margin: 10px 20px 10px;
  position: relative;
  border-radius: 2px;
  &:after {
    cursor: pointer;
    
    width: ${triangleSize}px;
    height: ${triangleSize}px;
    content: "";
    position: absolute;
    z-index: -1;
    background: ${btnColor};
    border-radius: 2px;
  }
  &:active {
    box-shadow: none;
    &:after {
      box-shadow: none;
    }
  }
`;

const UpButtonCss = css`
  ${ArrowButtonCss};
  border-bottom: none;
  box-shadow: -3px 0 4px -1px ${Color.darken10} inset,
              2px 5px 5px -2px ${Color.transparentWhite} inset;
  &:after {
    left: -2.5px;
    bottom: 0;
    transform-origin: 0 100%;
    transform: rotate(45deg);
    border-bottom: ${fissureBorder};
    border-right: ${fissureBorder};
    box-shadow: -3px -3px 4px -1px ${Color.darken10} inset,
                4px 3px 4px -2px ${Color.transparentDarken40},
                0 2.5px 2px -1px ${Color.transparentWhite} inset;
  }
`;

const LeftButtonCss = css`
  ${ArrowButtonCss};
  border-right: none;
  box-shadow: 0 -3px 2px -1px ${Color.darken10} inset,
              0px 6px 3px -3px ${Color.transparentDarken40},
              3px 5px 3px -2px ${Color.transparentWhite} inset;
  &:after {
    right: 0;
    bottom: -2.5px;
    transform-origin: 100% 100%;
    transform: rotate(45deg);
    border-top: ${fissureBorder};
    border-right: ${fissureBorder};
    box-shadow: -4px 0 3px -2px ${Color.darken10} inset,
                4px 0 4px -2px ${Color.transparentDarken40},
                0 2.5px 2px -1px ${Color.transparentWhite} inset;
  }
`;

const DownButtonCss = css`
  ${ArrowButtonCss};
  border-top: none;
  box-shadow: -3px -3px 2px -1px ${Color.darken10} inset,
              0px 5px 4px -2px ${Color.transparentDarken40},
              3px 0px 3px -2px ${Color.transparentWhite} inset;
  &:after {
    left: -2.5px;
    top: 0;
    transform-origin: 0 0;
    transform: rotate(-45deg);
    border-top: ${fissureBorder};
    border-right: ${fissureBorder};
    box-shadow: -3px 3px 2px -1px ${Color.transparentWhite} inset;
  }
`;

const RightButtonCss = css`
  ${ArrowButtonCss};
  border-left: none;
  box-shadow: 0 -3px 2px -1px ${Color.darken10} inset,
              0px 6px 4px -3px ${Color.transparentDarken40},
              0px 5px 3px -2px ${Color.transparentWhite} inset;

  &:after {
    left: 0;
    bottom: -2.5px;
    transform-origin: 0 100%;
    transform: rotate(-45deg);
    border-top: ${fissureBorder};
    border-left: ${fissureBorder};
    box-shadow: 4px 0 2px -2px ${Color.darken10} inset,
                -2px 0 2px -1px ${Color.transparentDarken40},
                0 3px 2px -1px ${Color.transparentWhite} inset;
  }
`;

export const enum BtnType {
    MAIN = "main",
    FUNC = "func",
    UP = "up",
    LEFT = "left",
    RIGHT = "right",
    DOWN = "down"
}

export const mapStyledButton = (btnType: BtnType): import("styled-components").FlattenSimpleInterpolation => {
    switch (btnType) {
        case BtnType.MAIN:
            return MainButtonCss;
        case BtnType.FUNC:
            return FuncButtonCss;
        case BtnType.UP:
            return UpButtonCss;
        case BtnType.LEFT:
            return LeftButtonCss;
        case BtnType.DOWN:
            return DownButtonCss;
        case BtnType.RIGHT:
            return RightButtonCss;
    }
};

export const ButtonStyles = {
    arrayKeySize: arrowSize,
};
