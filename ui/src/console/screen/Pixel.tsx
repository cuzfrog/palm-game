import React from 'react';
import style from './Pixel.less';

export const enum PixelState {
    ON, OFF, TWINKLE
}

interface Props {
    value: PixelState;
}

export default class extends React.PureComponent<Props, {}> {
    public render() {
        return (
            <td className={getPixelState(this.props.value)}/>
        );
    }
}

function getPixelState(state: PixelState) {
    switch (state) {
        case PixelState.ON:
            return style.pixelActive;
        case PixelState.OFF:
            return style.pixel;
        case PixelState.TWINKLE:
            throw new TypeError();
    }
}
