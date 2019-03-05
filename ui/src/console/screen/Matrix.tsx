import React from 'react';
import {List} from 'immutable';
import style from './Matrix.less';
import Pixel from './Pixel';
import {Specs} from '../../Specs';
import {Connects} from '../../store';
import {PixelState} from '../../domain';

const MATRIX_WIDTH = Specs.graphicWidth;
const MATRIX_HEIGHT = Specs.graphicHeight;
const ROWS_START_ARRAY: ReadonlyArray<number> = [...Array(MATRIX_HEIGHT).keys()];

export interface MatrixProps {
    readonly frame: List<PixelState>;
}

class Matrix extends React.PureComponent<MatrixProps, {}> {
    constructor(props: Readonly<MatrixProps>) {
        super(props);
        if (props.frame.size !== MATRIX_WIDTH * MATRIX_HEIGHT) {
            throw RangeError(`Invalid size, width=${MATRIX_WIDTH}, height=${MATRIX_HEIGHT}, pixelCnt=${props.frame.size}`);
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
        return this.props.frame.toSeq().slice(colIdxBegin, colIdxEndExclusive).map((a, ci) => (
            <Pixel value={a} key={ci}/>
        ));
    }
}

export default Connects.connectToMatrix(Matrix);
