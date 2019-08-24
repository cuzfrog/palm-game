export const enum Direction {
    NORTH = "NORTH",
    EAST = "EAST",
    SOUTH = "SOUTH",
    WEST = "WEST"
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
            throw new TypeError("UnknownDirection:" + d1);
    }
}
