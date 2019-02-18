import {DefaultSystemState, GameType, SystemState, SystemStatus} from './systemState';
import {nextNumEnum} from '../../utils';
import {SystemAction} from './systemActions';
import {ActionTypes} from '../actions';
import {getGameKeyboard, MenuKeyboardLayout, PauseKeyboardLayout} from '../keyboardDef';

const MAX_LEVEL = 9;
const GameTypeValues: ReadonlyArray<number> = Object.keys(GameType).map(key => GameType[key]);

export function systemReducer(state: SystemState = DefaultSystemState, action: SystemAction): SystemState {
    switch (action.type) {
        case ActionTypes.TOGGLE_PAUSE:
            if (state.status === SystemStatus.IN_GAME) {
                const inGamePaused = !state.inGamePaused;
                return {
                    ...state,
                    inGamePaused,
                    keyboardLayout: inGamePaused ? PauseKeyboardLayout : getGameKeyboard(state.gameType)
                };
            } else {
                return state;
            }
        case ActionTypes.ENTER_GAME:
            if (state.status === SystemStatus.MENU) {
                return {
                    ...state,
                    status: SystemStatus.IN_GAME,
                    keyboardLayout: getGameKeyboard(state.gameType),
                };
            } else {
                return state;
            }
        case ActionTypes.EXIT_GAME:
            if (state.status === SystemStatus.IN_GAME) {
                return {
                    ...state,
                    status: SystemStatus.MENU,
                    keyboardLayout: MenuKeyboardLayout,
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
            const gameType = nextNumEnum(state.gameType, GameTypeValues);
            return {
                ...state,
                gameType,
                keyboardLayout: getGameKeyboard(gameType)
            };
        default:
            return state;
    }
}
