import {W} from './graphic-types';

type Point = import('../../domain').Point;

export function toIndex(p: Point): number {
    return p.y * W + p.x;
}
