import { connect } from 'react-redux';
import { CoreActions } from '../core';

type Dispatch = import('redux').Dispatch;

function mapStateToProps(state: AppState): import('../../menu').MenuStateProps {
  return {
    infoExpanded: state.core.infoExpanded,
    audioEnabled: state.core.audioEnabled,
  };
}

function mapDispatchToProps(dispatch: Dispatch): import('../../menu').MenuActionProps {
  return {
    toggleExpansion: (folded: boolean) => folded ? dispatch(CoreActions.menuExpand()) : dispatch(CoreActions.menuFold()),
    toggleAudio: (enabled: boolean) => enabled ? dispatch(CoreActions.soundDisable()) : dispatch(CoreActions.soundEnable()),
  };
}

export const connectToMenu = connect(mapStateToProps, mapDispatchToProps);
