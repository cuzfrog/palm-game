import {ActionUnion, createAction, createActionWithPayload} from './types-utils';
import {ActionTypes} from './actions';

const consoleStart = createAction(ActionTypes.CONSOLE_START);
const consoleAnimate = createAction(ActionTypes.CONSOLE_ANIMATE);
const increaseLevel = createAction(ActionTypes.INCREASE_LEVEL);
const decreaseLevel = createAction(ActionTypes.DECREASE_LEVEL);
const enterGame = createAction(ActionTypes.ENTER_GAME);
const exitGame = createAction(ActionTypes.EXIT_GAME);
const togglePause = createAction(ActionTypes.TOGGLE_PAUSE);
const toggleGame = createAction(ActionTypes.TOGGLE_GAME);
const dummyAction = createAction(ActionTypes.DUMMY_ACTION);

export const CoreActions = Object.seal({
    consoleStart: () => consoleStart,
    consoleAnimate: () => consoleAnimate,
    addScore: (score: number) => createActionWithPayload(ActionTypes.ADD_SCORE, score),
    increaseLevel: () => increaseLevel,
    decreaseLevel: () => decreaseLevel,
    enterGame: () => enterGame,
    exitGame: () => exitGame,
    togglePause: () => togglePause,
    toggleGame: () => toggleGame,
    dummy: () => dummyAction,
});

export type CoreAction = ActionUnion<typeof CoreActions>;
