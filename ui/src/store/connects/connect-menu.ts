import { connect } from 'react-redux';
import { CoreActions } from '../core';

type Dispatch = import('redux').Dispatch;

function mapStateToProps(state: AppState): import('../../menu').MenuStateProps {
  return {
    expanded: state.core.menuExpanded,
  };
}

function mapDispatchToProps(dispatch: Dispatch): import('../../menu').MenuActionProps {
  return {
    toggleExpansion: (folded: boolean) => folded ? dispatch(CoreActions.menuExpand()) : dispatch(CoreActions.menuFold()),
  };
}

export const connectToMenu = connect(mapStateToProps, mapDispatchToProps);
