import {snakeEpic} from './snake-epic';
import {combineEpics} from 'redux-observable';

export {SnakeActions} from '../action/snake-actions';
export {snakeGameReducer} from './snake-reducer';

export const gameEpic = combineEpics(snakeEpic.epic);
