import {ValueObject} from 'immutable';

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

/** No binding for performance's sake */
export type Point = _Point;

export function Point(x: number, y: number): Point {
    return new _Point(x, y);
}
