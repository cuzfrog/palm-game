import React from 'react';
import style from './Matrix.less';
import Pixel from './Pixel';
import {List} from 'immutable';

const MATRIX_WIDTH = 10;
const MATRIX_HEIGHT = 3;
const ROWS_START_ARRAY: ReadonlyArray<number> = [...Array(MATRIX_HEIGHT).keys()];

export interface Props {
    readonly actives: List<boolean>;
}

export default class extends React.PureComponent<Props, {}> {
    constructor(props: Readonly<Props>) {
        super(props);
        if (props.actives.size !== MATRIX_WIDTH * MATRIX_HEIGHT) {
            throw RangeError(`Invalid size, width=${MATRIX_WIDTH}, height=${MATRIX_HEIGHT}, pixelCnt=${props.actives.size}`);
        }
        this.Row = this.Row.bind(this);
    }

    public render() {
        const rows = ROWS_START_ARRAY.map(rowIdx => (
                <tr key={rowIdx}>{this.Row(rowIdx)}</tr>
            )
        );
        return (
            <table className={style.matrix}>
                <tbody>{rows}</tbody>
            </table>
        );
    }

    private Row(rowIdx: number) {
        const colIdxBegin = rowIdx * MATRIX_WIDTH;
        const colIdxEndExclusive = colIdxBegin + MATRIX_WIDTH;
        return this.props.actives.toSeq().slice(colIdxBegin, colIdxEndExclusive).map((a, ci) => (
            <Pixel isActive={a} key={ci}/>
        ));
    }
}
