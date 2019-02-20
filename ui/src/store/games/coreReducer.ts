import produce from 'immer';
import {CoreGameState, DefaultCoreGameState} from './coreState';
import {CoreGameAction} from './coreActions';

export function coreGameReducer(state: CoreGameState = DefaultCoreGameState,
                                action: CoreGameAction): CoreGameState {
    return produce(state, draft => {

        }
    );
}
