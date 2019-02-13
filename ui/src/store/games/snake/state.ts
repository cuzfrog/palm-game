import {Direction, Point} from '../../types';
import {List} from 'immutable';

export interface SnakeGameState {
    readonly life: number;
    readonly body: List<Point>;
    readonly direction: Direction;
    readonly ingestedBean: boolean;
    readonly bean?: Point;
}
