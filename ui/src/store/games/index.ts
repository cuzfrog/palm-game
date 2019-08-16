import { combineEpics } from "redux-observable";
import { snakeEpic } from "./snake-epic";
import { tetrisEpic } from "./tetris-epic";

export { SnakeActions } from "../action/snake-actions";
export { snakeGameReducer } from "./snake-reducer";
export { tetrisGameReducer } from "./tetris-reducer";

export const gameEpic = combineEpics(snakeEpic.epic, tetrisEpic.epic);
