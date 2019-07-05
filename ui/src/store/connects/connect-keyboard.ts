import {connect} from 'react-redux';
import {KeyboardActions} from '../core';

type P = import('../../console').KeyboardProps;
type Dispatch = import('redux').Dispatch;

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

export const connectToKeyboard = connect(null, mapDispatchToProps);
