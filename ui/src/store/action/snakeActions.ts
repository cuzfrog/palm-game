import {ActionUnion, createAction, createActionWithPayload} from './typeHelper';
import {ActionTypes} from './actions';
import {Direction, Point} from '../../domain';

const biteSelf = createAction(ActionTypes.SNAKE_BITE_SELF);
const hitWall = createAction(ActionTypes.SNAKE_HIT_WALL);
const win = createAction(ActionTypes.SNAKE_WIN);
const nextLevel = createAction(ActionTypes.SNAKE_NEXT_LEVEL);

export const SnakeActions = {
    setDirection: (direction: Direction) => createActionWithPayload(ActionTypes.SET_DIRECTION, direction),
    biteSelf: () => biteSelf,
    hitWall: () => hitWall,
    creep: (head: Point, grown: boolean) => createActionWithPayload(ActionTypes.SNAKE_CREEP, {head, grown}),
    win: () => win,
    escape: (step: number) => createActionWithPayload(ActionTypes.SNAKE_ESCAPE, step),
    nextLevel: () => nextLevel,
};

export type SnakeAction = ActionUnion<typeof SnakeActions>;
