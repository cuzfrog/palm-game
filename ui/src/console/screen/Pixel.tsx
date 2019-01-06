import React from 'react';
import style from './Pixel.less';

interface PixelProps {
    isActive: boolean;
}

export default class extends React.Component<PixelProps, {}> {
    public render() {
        return (
            <div className={this.props.isActive ? style.active : style.pixel}/>
        );
    }
}
