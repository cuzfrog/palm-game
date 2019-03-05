import {AppState} from '../appState';
import {Graphic} from '../GraphicEngine';
import {connect} from 'react-redux';

function mapStateToProps(state: AppState) {
    return {
        frame: Graphic.show(state), // todo check: it relies on the Graphic to provide optimization.
    };
}

export const connectToMatrix = connect(mapStateToProps);
