import {connect} from 'react-redux';
import {AppState} from '../appState';
import {KeyboardDef} from '../keyboardDef';
import {Dispatch} from 'redux';

function mapStateToProps(state: AppState): KeyboardDef {
    return state.core.keyboardLayout;
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        dispatch
    };
};

export const connectToKeyboard = connect(mapStateToProps, mapDispatchToProps);
