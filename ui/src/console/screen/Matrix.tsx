import React from 'react';
import style from './Matrix.less';
import Pixel from './Pixel';
import {List} from 'immutable';

interface MatrixProps {
    readonly actives: List<List<boolean>>;
}

export default class extends React.Component<MatrixProps, {}> {
    public render() {
        const rows = this.props.actives.map((row, ri) => (
                <tr key={ri}>{this.Row(row)}</tr>
            )
        );
        return (
            <table className={style.matrix}>
                <tbody>{rows}</tbody>
            </table>
        );
    }

    private Row(actives: List<boolean>) {
        return actives.map((a, ci) => (
            <Pixel isActive={a} key={ci}/>
        ));
    }
}
