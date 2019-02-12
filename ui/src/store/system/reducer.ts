import {SystemState, SystemStatus} from './state';
import {utils} from '../../utils';
import {SystemAction} from './actions';
import {ActionTypes} from '../actions';

const MAX_LEVEL = 9;
const SYSTEM_STATUS_VALUES: ReadonlyArray<number> = Object.keys(SystemStatus).map(key => SystemStatus[key]);

export function systemReducer(state: SystemState, action: SystemAction): SystemState {
    switch (action.type) {
        case ActionTypes.TOGGLE_PAUSE:
            return {
                ...state, inGamePaused: !state.inGamePaused,
            };
        case ActionTypes.ENTER_GAME:
            if (state.status === SystemStatus.MENU) {
                return {
                    ...state,
                    status: SystemStatus.IN_GAME,
                };
            } else {
                return state;
            }
        case ActionTypes.EXIT_GAME:
            if (state.status === SystemStatus.IN_GAME) {
                return {
                    ...state,
                    status: SystemStatus.MENU,
                };
            } else {
                return state;
            }
        case ActionTypes.INCREASE_LEVEL:
            return {
                ...state,
                level: state.level >= MAX_LEVEL ? 1 : state.level + 1
            };
        case ActionTypes.DECREASE_LEVEL:
            return {
                ...state,
                level: state.level <= 1 ? MAX_LEVEL : state.level - 1
            };
        case ActionTypes.ADD_SCORE:
            const scores = state.scores.update(state.gameType, prevScore => prevScore + action.payload);
            return {
                ...state, scores,
            };
        case ActionTypes.TOGGLE_GAME:
            return {
                ...state,
                gameType: utils.nextNumEnum(state.gameType, SYSTEM_STATUS_VALUES),
            };
        default:
            return state;
    }
}
