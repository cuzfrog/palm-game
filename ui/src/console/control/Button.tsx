import React from 'react';
import style from './Button.less';

interface BtnProps {
    style: string;
}

interface BtnState {
    btnPos: BtnPosition;
}

enum BtnPosition {
    UP, DOWN
}

export default class extends React.Component<BtnProps, BtnState> {
    constructor(props: BtnProps) {
        super(props);
        this.state = {
            btnPos: BtnPosition.UP
        };
        this.down = this.down.bind(this);
        this.up = this.up.bind(this);
    }

    public render() {
        return (
            <div className={style.funcBtn} onMouseDown={this.down} onMouseUp={this.up} onMouseLeave={this.up}>
                <p>{this.state.btnPos}</p>
            </div>
        );
    }

    private down() {
        this.setState({
            btnPos: BtnPosition.DOWN
        });
    }

    private up() {
        this.setState({
            btnPos: BtnPosition.UP
        });
    }
}
