import {Direction, Point} from '../../types';
import {List, Range} from 'immutable';
import {ConsoleSpecs} from '../../../console/Specs';

const INITIAL_LENGTH = 5;

export interface SnakeGameState {
    readonly life: number;
    readonly body: List<Point>;
    readonly direction: Direction;
    readonly ingestedBean: boolean;
    readonly bean?: Point;
}

export const DefaultSnakeGameState: SnakeGameState = {
    life: 3,
    body: initialBody(),
    direction: Direction.NORTH,
    ingestedBean: false
};

function initialBody(): List<Point> {
    const tailY = ConsoleSpecs.graphicHeight - 2;
    const tailX = tailY - INITIAL_LENGTH + 1;
    return Range(tailX, tailY).map(y => {
        return {x: 3, y};
    }).toList();
}
