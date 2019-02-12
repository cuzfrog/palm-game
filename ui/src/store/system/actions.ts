import {ActionUnion, createAction} from '../typeHelper';
import {ActionTypes} from '../actions';
import {KeyboardProps} from '../../console/keyboard/Keyboard';

const increaseLevel = createAction(ActionTypes.INCREASE_LEVEL);
const decreaseLevel = createAction(ActionTypes.DECREASE_LEVEL);
const enterGame = createAction(ActionTypes.ENTER_GAME);
const exitGame = createAction(ActionTypes.EXIT_GAME);
const togglePause = createAction(ActionTypes.TOGGLE_PAUSE);
const toggleGame = createAction(ActionTypes.TOGGLE_GAME);
const dummyAction = createAction(ActionTypes.DUMMY_ACTION);

const SystemActions = {
    addScore: (score: number) => createAction(ActionTypes.ADD_SCORE, score),
    increaseLevel: () => increaseLevel,
    decreaseLevel: () => decreaseLevel,
    enterGame: () => enterGame,
    exitGame: () => exitGame,
    togglePause: () => togglePause,
    toggleGame: () => toggleGame,
    dummyAction: () => dummyAction,
};

export type SystemAction = ActionUnion<typeof SystemActions>;

export const SystemKeyboard: Readonly<KeyboardProps> = {
    funcProps: {
        selectAction: SystemActions.toggleGame(),
        startAction: SystemActions.enterGame(),
    },
    arrowProps: {
        leftAction: SystemActions.decreaseLevel(),
        rightAction: SystemActions.increaseLevel(),
        upAction: SystemActions.dummyAction(),
        downAction: SystemActions.dummyAction(),
    },
    mainProps: {
        actionA: SystemActions.dummyAction(),
        actionB: SystemActions.dummyAction()
    }
};