type ValueObject = import("immutable").ValueObject;

export interface Point extends ValueObject {
    readonly x: number;
    readonly y: number;
}

class _PointImpl implements Point {
    public readonly x: number;
    public readonly y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public equals(other: any): boolean {
        return other instanceof _PointImpl && other.x === this.x && other.y === this.y;
    }

    public hashCode(): number {
        return (37 * this.x + 11) * 17 + 13 * this.y;
    }
}

export function Point(x: number, y: number): Point {
    return new _PointImpl(x, y);
}
