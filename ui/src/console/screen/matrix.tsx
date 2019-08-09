import React from 'react';
import Pixel from './pixel';
import { Specs } from '../../specs';
import { Connects } from '../../store';
import styled from 'styled-components';
import autoBind from 'auto-bind';

const MATRIX_WIDTH = Specs.screen.graphicWidth;
const MATRIX_HEIGHT = Specs.screen.graphicHeight;
const ROWS_START_ARRAY: ReadonlyArray<number> = [...Array(MATRIX_HEIGHT).keys()];

export interface MatrixProps {
  readonly frame: Frame;
}

const MatrixTable = styled.table`
  width: 230px;
  border:2px solid #000;
  padding:1px;
`;

class Matrix extends React.PureComponent<MatrixProps, {}> {
  constructor(props: Readonly<MatrixProps>) {
    super(props);
    if (props.frame.size !== MATRIX_WIDTH * MATRIX_HEIGHT) {
      throw RangeError(`Invalid size, width=${MATRIX_WIDTH}, height=${MATRIX_HEIGHT}, pixelCnt=${props.frame.size}`);
    }
    autoBind.react(this);
  }

  public render() {
    const rows = ROWS_START_ARRAY.map(rowIdx => (<tr key={rowIdx}>{this.Row(rowIdx)}</tr>));
    return (
      <MatrixTable>
        <tbody>{rows}</tbody>
      </MatrixTable>
    );
  }

  private Row(rowIdx: number) {
    const colIdxBegin = rowIdx * MATRIX_WIDTH;
    const colIdxEndExclusive = colIdxBegin + MATRIX_WIDTH;
    return this.props.frame.toSeq().slice(colIdxBegin, colIdxEndExclusive).map((a, ci) => (
      <Pixel value={a} key={ci} />
    ));
  }
}

export default Connects.connectToMatrix(Matrix);
