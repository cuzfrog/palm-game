import {createAction} from '../../typeHelper';
import {ActionTypes} from '../../actions';
import {Direction} from '../../types';

export const SnakeActions = {
    setDirection: (direction: Direction) => createAction(ActionTypes.SET_DIRECTION, direction)
};
