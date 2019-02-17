import {ValueObject} from 'immutable';

export const enum Direction {
    NORTH, EAST, SOUTH, WEST
}

export function isOppositeDirection(d1: Direction, d2: Direction): boolean {
    switch (d1) {
        case Direction.NORTH:
            return d2 === Direction.SOUTH;
        case Direction.EAST:
            return d2 === Direction.WEST;
        case Direction.SOUTH:
            return d2 === Direction.NORTH;
        case Direction.WEST:
            return d2 === Direction.WEST;
        default:
            throw new TypeError('UnknownDirection:' + d1);
    }
}

class _Point implements ValueObject {
    public readonly x: number;
    public readonly y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public equals(other: any): boolean {
        return other instanceof _Point && other.x === this.x && other.y === this.y;
    }

    public hashCode(): number {
        return (37 * this.x + 11) * 17 + 13 * this.y;
    }
}

export type Point = _Point;

export function Point(x: number, y: number): Point {
    return new _Point(x, y);
}
