import {ActionUnion, createAction} from '../../typeHelper';
import {ActionTypes} from '../../actions';
import {Direction} from '../../types';

const eatBean = createAction(ActionTypes.SNAKE_EAT_BEAN);
const enterHole = createAction(ActionTypes.SNAKE_ENTER_HOLE);
const biteSelf = createAction(ActionTypes.SNAKE_BITE_SELF);
const hitWall = createAction(ActionTypes.SNAKE_HIT_WALL);
const creep = createAction(ActionTypes.SNAKE_CREEP);

export const SnakeActions = {
    setDirection: (direction: Direction) => createAction(ActionTypes.SET_DIRECTION, direction),
    eatBean: () => eatBean,
    enterHole: () => enterHole,
    biteSelf: () => biteSelf,
    hitWall: () => hitWall,
    creep: () => creep,
};

export type SnakeAction = ActionUnion<typeof SnakeActions>;
