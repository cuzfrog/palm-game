import {connect} from 'react-redux';
import {Graphic} from '../graphic';

type P = import('../../console').MatrixProps;

function mapStateToProps(state: AppState): P {
    return {
        frame: Graphic.show(state), // todo check: it relies on the Graphic to provide optimization.
    };
}

export const connectToMatrix = connect(mapStateToProps);
