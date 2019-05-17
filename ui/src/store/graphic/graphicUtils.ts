import {Frame, Point} from '../../domain';
import {L, W} from './graphicTypes';

export function toIndex(p: Point): number {
    return p.y * W + p.x;
}

export function validateFrame(frame: Frame): boolean {
    return L !== frame.size;
}
