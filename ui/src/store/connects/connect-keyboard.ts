import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {KeyboardProps} from '../../console/keyboard';
import {KeyboardActions} from '../core';

const mapDispatchToProps = (dispatch: Dispatch): KeyboardProps => {
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

export const connectToKeyboard = connect(null, mapDispatchToProps);
