import {connect} from 'react-redux';
import {AppState} from '../appState';
import {KeyboardProps} from '../../console/keyboard';


function mapStateToProps(state: AppState): KeyboardProps {
    return state.core.keyboardLayout;
}

const mapDispatchToProps = (dispatch): KeyboardProps => {
    return {
        dispatch
    };
};

export const connectToKeyboard = connect(mapStateToProps, mapDispatchToProps);
