import {connect} from 'react-redux';
import {AppState} from '../appState';
import {KeyboardDef} from '../keyboardDef';

function mapStateToProps(state: AppState): KeyboardDef {
    return state.core.keyboardLayout;
}

export const connectToKeyboard = connect(mapStateToProps);
