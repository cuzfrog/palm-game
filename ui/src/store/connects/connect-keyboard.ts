import { connect } from "react-redux";
import { KeyboardActions } from "../core";
import { GameType } from "src/domain";
import { Specs } from "src/specs";

type P = import("src/console").KeyboardProps;
type Dispatch = import("redux").Dispatch;

function mapStateToProps(state: AppState): import("src/console").KeyboardThrottleProps {
  let mainAThrottleInterval: number | undefined;
  switch (state.core.gameType) {
    case GameType.TETRIS:
      mainAThrottleInterval = Specs.tetrisGame.hardDropThrottleIntervalMs;
      break;
  }
  return {
    mainAThrottleInterval,
  };
}

const mapDispatchToProps = (dispatch: Dispatch): P => {
  return {
    upAction: () => dispatch(KeyboardActions.up),
    rightAction: () => dispatch(KeyboardActions.right),
    downAction: () => dispatch(KeyboardActions.down),
    leftAction: () => dispatch(KeyboardActions.left),
    selectAction: () => dispatch(KeyboardActions.select),
    startAction: () => dispatch(KeyboardActions.start),
    actionA: () => dispatch(KeyboardActions.a),
    actionB: () => dispatch(KeyboardActions.b),
  };
};

export const connectToKeyboard = connect(mapStateToProps, mapDispatchToProps);
