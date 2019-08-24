import { connect } from "react-redux";
import { Graphic } from "../graphic";
import { Specs } from "src/specs";

type P = import("src/console").MatrixProps;

function mapStateToProps(state: AppState): P {
  return {
    width: Specs.screen.graphicWidth,
    height: Specs.screen.graphicHeight,
    hasBorder: true,
    pixelSize: 12,
    frame: Graphic.drawMatrix(state),
  };
}

export const connectToMatrix = connect(mapStateToProps);
