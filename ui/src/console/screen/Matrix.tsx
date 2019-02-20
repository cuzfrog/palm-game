import React from 'react';
import style from './Matrix.less';
import Pixel, {PixelState} from './Pixel';
import {List} from 'immutable';
import {AppState} from '../../store';
import {Graphic} from '../GraphicEngine';
import {connect} from 'react-redux';

export const MATRIX_WIDTH = 10;
export const MATRIX_HEIGHT = 16;
const ROWS_START_ARRAY: ReadonlyArray<number> = [...Array(MATRIX_HEIGHT).keys()];

interface Props {
    readonly frame: List<PixelState>;
}

class Matrix extends React.PureComponent<Props, {}> {
    constructor(props: Readonly<Props>) {
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

function mapStateToProps(state: AppState): Props {
    return {
        frame: Graphic.show(state), // todo check: it relies on the Graphic to provide optimization.
    };
}

export default connect(mapStateToProps)(Matrix);
