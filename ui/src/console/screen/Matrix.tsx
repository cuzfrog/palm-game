import React from 'react';
import style from './Matrix.less';
import Pixel from './Pixel';

interface MatrixProps {
    readonly actives: boolean[][];
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

    private Row(actives: boolean[]) {
        return actives.map((a, ci) => (
            <Pixel isActive={a} key={ci}/>
        ));
    }
}
