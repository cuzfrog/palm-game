import {Direction, Point} from '../../types';
import {Range, List} from 'immutable';
import {ConsoleSpecs} from '../../../console';

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

const INITIAL_LENGTH = 5;

function initialBody(): List<Point> {
    const tailY = ConsoleSpecs.graphicHeight - 2;
    const tailX = tailY - INITIAL_LENGTH + 1;
    return Range(tailX, tailY).map(y => {
        return {x: 3, y};
    }).toList();
}
