import {SystemActions} from './system/actions';

export const enum ActionTypes {
    ADD_SCORE = '[system] add score',
    INCREASE_LEVEL = '[system] increase level',
    DECREASE_LEVEL = '[system] decrease level',
    TOGGLE_PAUSE = '[system] toggle pause',
    ENTER_GAME = '[system] enter game',
    EXIT_GAME = '[system] exit game',
    TOGGLE_GAME = '[system toggle game]',
}

export const Actions = {
    sys: SystemActions
};
