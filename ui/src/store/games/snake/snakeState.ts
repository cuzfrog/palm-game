import {Direction, Point} from '../../types';
import {List, Range} from 'immutable';
import {Specs} from '../../../Specs';

const INITIAL_LENGTH = 5;

export interface SnakeGameState {
    readonly life: number;
    readonly body: List<Point>;
    readonly direction: Direction;
    readonly bean?: Point;
}

export const DefaultSnakeGameState: SnakeGameState = {
    life: 3,
    body: initialBody(),
    direction: Direction.NORTH,
};

function initialBody(): List<Point> {
    const tailY = Specs.graphicHeight - 2;
    const tailX = tailY - INITIAL_LENGTH;
    return Range(tailX, tailY).reverse().map(y => {
        return {x: 3, y};
    }).toList();
}