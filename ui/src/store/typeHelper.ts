import {Action} from 'redux';

export interface ActionWithPayload<T extends string, P> extends Action<T> {
    readonly payload: P;
}

export function createAction<T extends string, P>(type: T): Action<T>;
export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P> ;
export function createAction<T extends string, P>(type: T, payload?: P) {
    return payload ? {type, payload} : {type};
}

type FunctionType = (...arg: any[]) => any;
interface MapObject {
    [actionCreator: string]: FunctionType;
}
export type ActionUnion<A extends MapObject> = ReturnType<A[keyof A]>;
