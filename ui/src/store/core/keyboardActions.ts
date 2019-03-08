import {createAction} from '../typeHelper';
import {ActionTypes} from '../actions';

const up = createAction(ActionTypes.UP);
const right = createAction(ActionTypes.RIGHT);
const down = createAction(ActionTypes.DOWN);
const left = createAction(ActionTypes.LEFT);
const select = createAction(ActionTypes.SELECT);
const start = createAction(ActionTypes.START);
const a = createAction(ActionTypes.A);
const b = createAction(ActionTypes.B);

export const KeyboardActions = Object.seal({
    up,
    right,
    down,
    left,
    select,
    start,
    a,
    b
});

type A = typeof KeyboardActions;

export type KeyboardAction = A[keyof A];
