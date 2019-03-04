import {ActionUnion, createAction, createActionWithPayload} from '../typeHelper';
import {ActionTypes} from '../actions';

const increaseLevel = createAction(ActionTypes.INCREASE_LEVEL);
const decreaseLevel = createAction(ActionTypes.DECREASE_LEVEL);
const enterGame = createAction(ActionTypes.ENTER_GAME);
const exitGame = createAction(ActionTypes.EXIT_GAME);
const togglePause = createAction(ActionTypes.TOGGLE_PAUSE);
const toggleGame = createAction(ActionTypes.TOGGLE_GAME);

export const CoreActions = Object.seal({
    addScore: (score: number) => createActionWithPayload(ActionTypes.ADD_SCORE, score),
    increaseLevel: () => increaseLevel,
    decreaseLevel: () => decreaseLevel,
    enterGame: () => enterGame,
    exitGame: () => exitGame,
    togglePause: () => togglePause,
    toggleGame: () => toggleGame,
});

export type SystemAction = ActionUnion<typeof CoreActions>;