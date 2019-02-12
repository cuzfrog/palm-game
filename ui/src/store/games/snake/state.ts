import {Direction} from '../../types';

export interface SnakeGameState {
    readonly life: number;
    readonly length: number;
    readonly direction: Direction;
}
