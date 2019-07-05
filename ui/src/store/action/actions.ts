export const enum ActionTypes {
    DUMMY_ACTION = '[none] dummy action',

    CONSOLE_START = '[sys] console start',
    CONSOLE_ANIMATE = '[sys] console animate',
    CONSOLE_ANIMATE_DONE = '[sys] console animate done',
    TOGGLE_PAUSE = '[sys] toggle pause',
    ENTER_GAME = '[sys] enter game',
    EXIT_GAME = '[sys] exit game',
    TOGGLE_GAME = '[sys] toggle game',

    UP = '[key] trigger up',
    RIGHT = '[key] trigger right',
    DOWN = '[key] trigger down',
    LEFT = '[key] trigger left',
    SELECT = '[key] trigger select',
    START = '[key] trigger START',
    A = '[key] trigger A',
    B = '[key] trigger B',

    INCREASE_LEVEL = '[game] increase level',
    DECREASE_LEVEL = '[game] decrease level',
    ADD_SCORE = '[game] add score',
    SET_DIRECTION = '[game] set direction',

    SNAKE_CREEP = '[game snake] creep',
    SNAKE_BITE_SELF = '[game snake] bite self',
    SNAKE_HIT_WALL = '[game snake] hit wall',
    SNAKE_ESCAPE = '[game snake] escape through hole',
    SNAKE_WIN = '[game snake] win',
    SNAKE_NEXT_LEVEL = '[game snake] next level',
}

const directionKeys = Object.freeze([ActionTypes.UP, ActionTypes.RIGHT, ActionTypes.DOWN, ActionTypes.LEFT]);
const mainKeys = Object.freeze([ActionTypes.A, ActionTypes.B]);
const funcKeys = Object.freeze([ActionTypes.SELECT, ActionTypes.START]);
const allKeys = Object.freeze([...funcKeys, ...mainKeys, ...funcKeys]);
const noLogging = Object.freeze([...allKeys, ActionTypes.CONSOLE_ANIMATE]);

export const ActionGroups = Object.freeze({
    directionKeys,
    mainKeys,
    funcKeys,
    allKeys,
    noLogging
});
