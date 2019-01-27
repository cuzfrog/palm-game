import {Action} from 'redux';

interface SetLevel extends Action<'SYSTEM_SET_LEVEL'> {
    readonly level: number;
}

interface SetScore extends Action<'SYSTEM_SET_SCORE'> {
    readonly score: number;
}

export type SystemAction =
    Action<'SYSTEM_TOGGLE_PAUSE'>
    | Action<'SYSTEM_ENTER_GAME'> | Action<'SYSTEM_EXIT_GAME'>
    | SetScore | SetLevel
    | Action<'SYSTEM_TOGGLE_GAME'>;
