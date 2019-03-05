import {connect} from 'react-redux';
import {AppState} from '../appState';
import {Graphic} from '../GraphicEngine';
import {MatrixProps} from '../../console';

function mapStateToProps(state: AppState): MatrixProps {
    return {
        frame: Graphic.show(state), // todo check: it relies on the Graphic to provide optimization.
    };
}

export const connectToMatrix = connect(mapStateToProps);
