import React from 'react';
import style from './Pixel.less';

interface PixelProps {
    isActive: boolean;
}

export default class extends React.Component<PixelProps, {}> {
    public render() {
        return (
            <td className={this.props.isActive ? style.pixelActive : style.pixel}/>
        );
    }
}
