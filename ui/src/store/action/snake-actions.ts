import {createAction, createActionWithPayload} from './types-utils';
import {ActionType} from './actions';
import {Direction, Point} from '../../domain';

const biteSelf = createAction(ActionType.SNAKE_BITE_SELF);
const hitWall = createAction(ActionType.SNAKE_HIT_WALL);
const win = createAction(ActionType.SNAKE_WIN);
const nextLevel = createAction(ActionType.SNAKE_NEXT_LEVEL);

export const SnakeActions = Object.freeze({
    setDirection: (direction: Direction) => createActionWithPayload(ActionType.SET_DIRECTION, direction),
    biteSelf: () => biteSelf,
    hitWall: () => hitWall,
    creep: (head: Point, grown: boolean) => createActionWithPayload(ActionType.SNAKE_CREEP, {head, grown}),
    win: () => win,
    escape: (step: number) => createActionWithPayload(ActionType.SNAKE_ESCAPE, step),
    nextLevel: () => nextLevel,
});

export type SnakeAction = import('./types-utils').ActionUnion<typeof SnakeActions>;
