import autoBind from "auto-bind";
import { Range } from "immutable";
import React from "react";
import { Connects } from "src/store";
import styled from "styled-components";
import Pixel from "./pixel";

interface Style {
  readonly width: number;
  readonly hasBorder: boolean;
}

export interface MatrixProps extends Style {
  readonly width: number;
  readonly height: number;
  readonly frame: Frame;
}

const MatrixTable = styled.table`
  width: ${(props: Style) => 23 * props.width}px;
  ${(props: Style) => props.hasBorder ? "border:2px solid #000" : ""};
  padding:1px;
`;

class Matrix extends React.PureComponent<MatrixProps, {}> {

  constructor(props: Readonly<MatrixProps>) {
    super(props);
    if (props.frame.size !== props.width * props.height) {
      throw RangeError(`Invalid size, width=${props.width}, height=${props.height}, pixelCnt=${props.frame.size}`);
    }
    autoBind.react(this);
  }

  public render() {
    const rows = Range(0, this.props.height).map(rowIdx => (<tr key={rowIdx}>{this.Row(rowIdx)}</tr>));
    return (
      <MatrixTable width={this.props.width} hasBorder={this.props.hasBorder}>
        <tbody>{rows}</tbody>
      </MatrixTable>
    );
  }

  private Row(rowIdx: number) {
    const colIdxBegin = rowIdx * this.props.width;
    const colIdxEndExclusive = colIdxBegin + this.props.width;
    return this.props.frame.toSeq().slice(colIdxBegin, colIdxEndExclusive).map((a, ci) => (
      <Pixel value={a} key={ci} />
    ));
  }
}

export default Connects.connectToMatrix(Matrix);
