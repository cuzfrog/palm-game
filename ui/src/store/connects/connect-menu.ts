import { connect } from "react-redux";
import { CoreActions } from "../core";

type Dispatch = import("redux").Dispatch;

function mapStateToProps(state: AppState): import("src/menu").MenuStateProps {
  return {
    audioEnabled: state.core.audioEnabled,
  };
}

function mapDispatchToProps(dispatch: Dispatch): import("src/menu").MenuActionProps {
  return {
    toggleAudio: (enabled: boolean) => enabled ? dispatch(CoreActions.soundDisable()) : dispatch(CoreActions.soundEnable()),
  };
}

export const connectToMenu = connect(mapStateToProps, mapDispatchToProps);
