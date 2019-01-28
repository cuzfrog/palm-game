import {Action} from 'redux';

interface AddScore extends Action<'SYSTEM_SET_SCORE'> {
    readonly score: number;
}

export type SystemAction =
    Action<'SYSTEM_TOGGLE_PAUSE'>
    | Action<'SYSTEM_ENTER_GAME'> | Action<'SYSTEM_EXIT_GAME'>
    | AddScore
    | Action<'SYSTEM_INCREASE_LEVEL'> | Action<'SYSTEM_DECREASE_LEVEL'>
    | Action<'SYSTEM_TOGGLE_GAME'>;
