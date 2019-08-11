import {connect} from 'react-redux';
import {Graphic} from '../graphic';

type P = import('src/console').MatrixProps;

function mapStateToProps(state: AppState): P {
    return {
        frame: Graphic.draw(state),
    };
}

export const connectToMatrix = connect(mapStateToProps);
