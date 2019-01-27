import {SYSTEM_STATUS_VALUES, SystemState, SystemStatus} from './state';
import {GameType} from '../types';
import {SystemAction} from './actions';
import {utils} from '../../utils';

const initialState: SystemState = {
    status: SystemStatus.MENU,
    score: 0,
    level: 1,
    gameType: GameType.SNAKE
};

export function systemReducer(state: SystemState = initialState, action: SystemAction): SystemState {
    switch (action.type) {
        case 'SYSTEM_TOGGLE_PAUSE':
            if (state.status === SystemStatus.IN_GAME) {
                return {
                    ...state,
                    status: SystemStatus.IN_GAME_PAUSED,
                };
            } else if (state.status === SystemStatus.IN_GAME_PAUSED) {
                return {
                    ...state,
                    status: SystemStatus.IN_GAME,
                };
            } else {
                return state;
            }
        case 'SYSTEM_ENTER_GAME':
            if (state.status === SystemStatus.MENU) {
                return {
                    ...state,
                    status: SystemStatus.IN_GAME,
                };
            } else {
                return state;
            }
        case 'SYSTEM_EXIT_GAME':
            if (state.status === SystemStatus.IN_GAME) {
                return {
                    ...state,
                    status: SystemStatus.MENU,
                };
            } else {
                return state;
            }
        case 'SYSTEM_SET_LEVEL':
            return {
                ...state,
                level: action.level,
            };
        case 'SYSTEM_SET_SCORE':
            return {
                ...state,
                score: action.score,
            };
        case 'SYSTEM_TOGGLE_GAME':
            return {
                ...state,
                gameType: utils.nextNumEnum(state.gameType, SYSTEM_STATUS_VALUES),
            };
        default:
            return state;
    }
}
