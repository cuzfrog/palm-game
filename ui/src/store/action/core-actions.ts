import { createAction, createActionWithPayload } from "./types-utils";
import { ActionType } from "./actions";

const soundEnable = createAction(ActionType.ENABLE_SOUND);
const soundDisable = createAction(ActionType.DISABLE_SOUND);
const consoleStart = createAction(ActionType.CONSOLE_START);
const consoleAnimate = createAction(ActionType.CONSOLE_ANIMATE);
const increaseLevel = createAction(ActionType.INCREASE_LEVEL);
const decreaseLevel = createAction(ActionType.DECREASE_LEVEL);
const enterGame = createAction(ActionType.ENTER_GAME);
const exitGame = createAction(ActionType.EXIT_GAME);
const togglePause = createAction(ActionType.TOGGLE_PAUSE);
const toggleGame = createAction(ActionType.TOGGLE_GAME);
const dummyAction = createAction(ActionType.DUMMY_ACTION);

const nextLevel = createAction(ActionType.GAME_NEXT_LEVEL);
const win = createAction(ActionType.GAME_WIN);

export const CoreActions = Object.freeze({
  soundEnable: () => soundEnable,
  soundDisable: () => soundDisable,
  consoleStart: () => consoleStart,
  consoleAnimate: () => consoleAnimate,
  addScore: (score: number) => createActionWithPayload(ActionType.ADD_SCORE, score),
  increaseLevel: () => increaseLevel,
  decreaseLevel: () => decreaseLevel,
  enterGame: () => enterGame,
  exitGame: () => exitGame,
  togglePause: () => togglePause,
  toggleGame: () => toggleGame,
  quitGame: (confirm: boolean) => createActionWithPayload(ActionType.QUIT_GAME, confirm),
  dummy: () => dummyAction,

  nextLevel: () => nextLevel,
  win: () => win,
});

export type CoreAction = import("./types-utils").ActionUnion<typeof CoreActions>;
