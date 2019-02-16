import {ActionUnion, createAction} from '../../typeHelper';
import {ActionTypes} from '../../actions';
import {Direction, Point} from '../../types';

const biteSelf = createAction(ActionTypes.SNAKE_BITE_SELF);
const hitWall = createAction(ActionTypes.SNAKE_HIT_WALL);

export const SnakeActions = {
    setDirection: (direction: Direction) => createAction(ActionTypes.SET_DIRECTION, direction),
    biteSelf: () => biteSelf,
    hitWall: () => hitWall,
    creep: (head: Point, grown: boolean) => createAction(ActionTypes.SNAKE_CREEP, {head, grown}),
};

export type SnakeAction = ActionUnion<typeof SnakeActions>;
