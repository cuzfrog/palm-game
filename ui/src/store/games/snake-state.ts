import {Direction, Point} from '../../domain';
import {List, Range} from 'immutable';
import {Specs} from '../../specs';

const INITIAL_LENGTH = 5;

export interface SnakeGameState {
    readonly body: List<Point>;
    readonly direction: Direction;
    readonly life: number;
    readonly bean?: Point;
    readonly hole?: Point;
}

const DefaultSnakeGameState: SnakeGameState = Object.freeze({
    body: initialBody(),
    direction: Direction.NORTH,
    life: 3
});

export const SnakeGameState = Object.freeze({
    Default: DefaultSnakeGameState
});

function initialBody(): List<Point> {
    const tailY = Specs.screen.graphicHeight - 2;
    const tailX = tailY - INITIAL_LENGTH;
    return Range(tailX, tailY).reverse().map(y => {
        return Point(3, y);
    }).toList();
}
