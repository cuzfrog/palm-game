import React from 'react';
import style from './Pixel.less';

export const enum PixelState {
    ON, OFF, TWINKLE
}

interface Props {
    value: PixelState;
}

export default class Pixel extends React.PureComponent<Props, {}> {
    public render() {
        return (
            <td className={getPixelStyle(this.props.value)}/>
        );
    }
}

function getPixelStyle(state: PixelState): string {
    switch (state) {
        case PixelState.ON:
            return style.pixelActive;
        case PixelState.OFF:
            return style.pixel;
        case PixelState.TWINKLE:
            return style.pixelTwinkle;
    }
}
