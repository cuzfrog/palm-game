export const enum ActionTypes {
    DUMMY_ACTION = '[none] dummy action',

    INCREASE_LEVEL = '[system] increase level',
    DECREASE_LEVEL = '[system] decrease level',
    TOGGLE_PAUSE = '[system] toggle pause',
    ENTER_GAME = '[system] enter game',
    EXIT_GAME = '[system] exit game',
    TOGGLE_GAME = '[system] toggle game',

    ADD_SCORE = '[game] add score',
    SET_DIRECTION = '[game] set direction',

    SNAKE_CREEP = '[game snake] creep',
    SNAKE_BITE_SELF = '[game snake] bite self',
    SNAKE_HIT_WALL = '[game snake] hit wall',
}
