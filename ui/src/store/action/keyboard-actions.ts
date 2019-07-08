import {createAction} from './types-utils';
import {ActionType} from './actions';

const up = createAction(ActionType.UP);
const right = createAction(ActionType.RIGHT);
const down = createAction(ActionType.DOWN);
const left = createAction(ActionType.LEFT);
const select = createAction(ActionType.SELECT);
const start = createAction(ActionType.START);
const a = createAction(ActionType.A);
const b = createAction(ActionType.B);

export const KeyboardActions = Object.freeze({
    up,
    right,
    down,
    left,
    select,
    start,
    a,
    b,
});

type A = typeof KeyboardActions;

export type KeyboardAction = A[keyof A];
