import {Action} from 'redux';
import {checkNonEmpty} from '../../utils';

interface ActionWithPayload<T extends string, P> extends Action<T> {
    readonly payload: P;
}

export function createAction<T extends string, P>(type: T): Action<T> {
    return Object.seal({type: checkNonEmpty(type)});
}

export function createActionWithPayload<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P> {
    return Object.seal({type: checkNonEmpty(type), payload: checkNonEmpty(payload)});
}

type FunctionType = (...arg: any[]) => any;

interface MapObject {
    [actionCreator: string]: FunctionType;
}

export type ActionUnion<A extends MapObject> = ReturnType<A[keyof A]>;
