import produce from 'immer';
import {CoreState, DefaultSystemState} from './coreState';
import {checkStrictEqual, checkStrictNonEqual, nextEnum} from '../../utils';
import {CoreAction} from './coreActions';
import {ActionTypes} from '../actions';
import {Specs} from '../../Specs';
import {GameType, SystemStatus} from '../../domain';

const GameTypeValues: ReadonlyArray<number> = Object.keys(GameType).map(key => GameType[key]);

export function coreReducer(state: CoreState = DefaultSystemState, action: CoreAction): CoreState {
    return produce(state, draft => {
            switch (action.type) {
                case ActionTypes.ADD_SCORE:
                    draft.scores = state.scores.update(state.gameType, prevScore => prevScore + action.payload);
                    break;
                case ActionTypes.INCREASE_LEVEL:
                    draft.level = state.level >= Specs.maxLevel ? 1 : state.level + 1;
                    break;
                case ActionTypes.DECREASE_LEVEL:
                    draft.level = state.level <= 1 ? Specs.maxLevel : state.level - 1;
                    break;
                case ActionTypes.TOGGLE_PAUSE:
                    checkStrictEqual(state.status, SystemStatus.IN_GAME, 'cannot pause game if not in game.');
                    draft.inGamePaused = !state.inGamePaused;
                    break;
                case ActionTypes.ENTER_GAME:
                    checkStrictEqual(state.status, SystemStatus.MENU, 'can only enter game from menu.');
                    draft.status = SystemStatus.IN_GAME;
                    break;
                case ActionTypes.EXIT_GAME:
                    checkStrictEqual(state.status, SystemStatus.IN_GAME, 'cannot exit game if not in game.');
                    draft.status = SystemStatus.MENU;
                    break;
                case ActionTypes.TOGGLE_GAME:
                    checkStrictNonEqual(state.status, SystemStatus.IN_GAME, 'cannot toggle game when in game.');
                    draft.gameType = nextEnum(state.gameType, GameTypeValues);
            }
        }
    );
}
