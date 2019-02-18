import produce from 'immer';
import {DefaultSystemState, GameType, SystemState, SystemStatus} from './systemState';
import {nextNumEnum} from '../../utils';
import {SystemAction} from './systemActions';
import {ActionTypes} from '../actions';
import {getGameKeyboard, MenuKeyboardLayout, PauseKeyboardLayout} from '../keyboardDef';

const MAX_LEVEL = 8;
const GameTypeValues: ReadonlyArray<number> = Object.keys(GameType).map(key => GameType[key]);

export function systemReducer(state: SystemState = DefaultSystemState, action: SystemAction): SystemState {
    return produce(state, draft => {
            switch (action.type) {
                case ActionTypes.TOGGLE_PAUSE:
                    if (state.status === SystemStatus.IN_GAME) {
                        const inGamePaused = !state.inGamePaused;
                        draft.inGamePaused = inGamePaused;
                        draft.keyboardLayout = inGamePaused ? PauseKeyboardLayout : getGameKeyboard(state.gameType);
                    }
                    break;
                case ActionTypes.ENTER_GAME:
                    if (state.status === SystemStatus.MENU) {
                        draft.status = SystemStatus.IN_GAME;
                        draft.keyboardLayout = getGameKeyboard(state.gameType);
                    }
                    break;
                case ActionTypes.EXIT_GAME:
                    if (state.status === SystemStatus.IN_GAME) {
                        draft.status = SystemStatus.MENU;
                        draft.keyboardLayout = MenuKeyboardLayout;
                    }
                    break;
                case ActionTypes.INCREASE_LEVEL:
                    draft.level = state.level >= MAX_LEVEL ? 1 : state.level + 1;
                    break;
                case ActionTypes.DECREASE_LEVEL:
                    draft.level = state.level <= 1 ? MAX_LEVEL : state.level - 1;
                    break;
                case ActionTypes.ADD_SCORE:
                    draft.scores = state.scores.update(state.gameType, prevScore => prevScore + action.payload);
                    break;
                case ActionTypes.TOGGLE_GAME:
                    const gameType = nextNumEnum(state.gameType, GameTypeValues);
                    draft.gameType = gameType;
                    draft.keyboardLayout = getGameKeyboard(gameType);
            }
        }
    );
}
