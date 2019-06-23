import {snakeEpic} from './snakeEpic';
import {combineEpics} from 'redux-observable';

export {SnakeActions, SnakeAction} from './snakeActions';
export {snakeGameReducer} from './snakeReducer';
export {SnakeGameState, DefaultSnakeGameState} from './snakeState';

export const gameEpic = combineEpics(snakeEpic.epic);
