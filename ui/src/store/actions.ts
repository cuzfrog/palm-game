export const enum ActionTypes {
    DUMMY_ACTION = '[none] dummy action',

    TOGGLE_PAUSE = '[sys] toggle pause',
    ENTER_GAME = '[sys] enter game',
    EXIT_GAME = '[sys] exit game',
    TOGGLE_GAME = '[sys] toggle game',

    INCREASE_LEVEL = '[game] increase level',
    DECREASE_LEVEL = '[game] decrease level',
    ADD_SCORE = '[game] add score',
    SET_DIRECTION = '[game] set direction',

    SNAKE_CREEP = '[game snake] creep',
    SNAKE_BITE_SELF = '[game snake] bite self',
    SNAKE_HIT_WALL = '[game snake] hit wall',
}
