import produce from 'immer';
import {CoreState, DefaultCoreState} from './coreState';
import {checkStrictEqual, checkStrictNonEqual, nextEnum} from '../../utils';
import {CoreAction, ActionTypes} from '../action';
import {Specs} from '../../Specs';
import {GameType, SystemStatus} from '../../domain';
import {Anim, Animations} from '../graphic';

const GameTypeValues: ReadonlyArray<GameType> = Object.keys(GameType).map(key => GameType[key]);

export function coreReducer(state: CoreState = DefaultCoreState, action: CoreAction): CoreState {
    return produce(state, draft => {
            switch (action.type) {
                case ActionTypes.ADD_SCORE:
                    draft.scores = state.scores.update(state.gameType, prevScore => scoreUpdater(prevScore, action.payload));
                    break;
                case ActionTypes.INCREASE_LEVEL:
                    const li = state.getLevel();
                    draft.level = state.level.set(state.gameType, li >= Specs.core.maxLevel ? 1 : li + 1);
                    break;
                case ActionTypes.DECREASE_LEVEL:
                    const ld = state.getLevel();
                    draft.level = state.level.set(state.gameType, ld <= 1 ? Specs.core.maxLevel : ld - 1);
                    break;
                case ActionTypes.CONSOLE_START:
                    draft.anim = Animations.consoleStartInitial;
                    break;
                case ActionTypes.CONSOLE_ANIMATE:
                    if (draft.anim.isCompleted()) {
                        if (state.status === SystemStatus.STARTING) {
                            draft.status = SystemStatus.MENU;
                        }
                        draft.anim = currentAnimation(state);
                    } else {
                        draft.anim = draft.anim.advance();
                    }
                    break;
                case ActionTypes.TOGGLE_PAUSE:
                    checkStrictEqual(state.status, SystemStatus.IN_GAME, 'cannot pause game if not in game.');
                    draft.inGamePaused = !state.inGamePaused;
                    break;
                case ActionTypes.ENTER_GAME:
                    checkStrictEqual(state.status, SystemStatus.MENU, 'can only enter game from menu.');
                    draft.scores = state.scores.set(state.gameType, 0);
                    draft.anim = Animations.emptyAnim;
                    draft.status = SystemStatus.IN_GAME;
                    break;
                case ActionTypes.EXIT_GAME:
                    checkStrictEqual(state.status, SystemStatus.IN_GAME, 'cannot exit game if not in game.');
                    draft.status = SystemStatus.MENU;
                    draft.maxScores = state.scores.mergeWith(maxFunc, state.maxScores);
                    break;
                case ActionTypes.TOGGLE_GAME:
                    checkStrictNonEqual(state.status, SystemStatus.IN_GAME, 'cannot toggle game when in game.');
                    draft.gameType = nextEnum(state.gameType, GameTypeValues);
                    draft.anim = currentAnimation(draft as CoreState);
            }
        }
    );
}

function scoreUpdater(prevScore: number | undefined, payload: number): number {
    const base = prevScore ? prevScore : 0;
    return base + payload;
}

function maxFunc(s1: number | undefined, s2: number | undefined) {
    const v1 = s1 ? s1 : 0;
    const v2 = s2 ? s2 : 0;
    return Math.max(v1, v2);
}

function currentAnimation(state: CoreState): Anim {
    let nextAnim: Anim;
    switch (state.status) {
        case SystemStatus.STARTING:
        case SystemStatus.MENU:
            switch (state.gameType) {
                case GameType.SNAKE:
                    nextAnim = Animations.snakeInitial;
                    break;
                default:
                    nextAnim = Animations.boxerInitial;
                    break;
            }
            break;
        default:
            nextAnim = Animations.emptyAnim;
    }
    return nextAnim;
}
