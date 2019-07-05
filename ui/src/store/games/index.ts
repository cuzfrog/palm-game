import {snakeEpic} from './snake-epic';
import {combineEpics} from 'redux-observable';

export {SnakeActions, SnakeAction} from '../action/snake-actions';
export {snakeGameReducer} from './snake-reducer';
export {SnakeGameState} from './snake-state';

export const gameEpic = combineEpics(snakeEpic.epic);
