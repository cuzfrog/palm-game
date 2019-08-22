export const enum ActionType {
    DUMMY_ACTION = "[none] dummy action",

    ENABLE_SOUND = "[sys] enable sound",
    DISABLE_SOUND = "[sys] disable sound",
    CONSOLE_START = "[sys] console start",
    CONSOLE_ANIMATE = "[sys] console animate",
    TOGGLE_PAUSE = "[sys] toggle pause",
    ENTER_GAME = "[sys] enter game",
    EXIT_GAME = "[sys] exit game",
    TOGGLE_GAME = "[sys] toggle game",

    UP = "[key] trigger up",
    RIGHT = "[key] trigger right",
    DOWN = "[key] trigger down",
    LEFT = "[key] trigger left",
    SELECT = "[key] trigger select",
    START = "[key] trigger START",
    A = "[key] trigger A",
    B = "[key] trigger B",

    QUIT_GAME = "[game] quit",
    GAME_NEXT_LEVEL = "[game] next level",
    GAME_WIN = "[game] win",

    INCREASE_LEVEL = "[game] increase level",
    DECREASE_LEVEL = "[game] decrease level",
    ADD_SCORE = "[game] add score",
    SET_DIRECTION = "[game] set direction",

    SNAKE_CREEP = "[game snake] creep",
    SNAKE_BITE_SELF = "[game snake] bite self",
    SNAKE_HIT_WALL = "[game snake] hit wall",
    SNAKE_ESCAPE = "[game snake] escape through hole",

    TETRIS_ROTATE = "[game tetris] rotate",
    TETRIS_DESCEND = "[game tetris] descend",
    TETRIS_MOVE = "[game tetris] move",
    TETRIS_HARD_DROP = "[game tetris] hard drop",
    TETRIS_LOCK_DOWN = "[game tetris] lock down",
    TETRIS_NEXT_BLOCK = "[game tetris] next block",
    TETRIS_LINE_MARK_PAUSE = "[game tetris] line mark pause (pre-clear)",
    TETRIS_LINE_CLEAR = "[game tetris] line clear"
}

const directionKeys = Object.freeze([ActionType.UP, ActionType.RIGHT, ActionType.DOWN, ActionType.LEFT]);
const mainKeys = Object.freeze([ActionType.A, ActionType.B]);
const funcKeys = Object.freeze([ActionType.SELECT, ActionType.START]);
const allKeys = Object.freeze([...funcKeys, ...mainKeys, ...funcKeys]);
const noLogging = Object.freeze([...allKeys, ActionType.CONSOLE_ANIMATE]);

export const ActionGroups = Object.freeze({
    directionKeys,
    mainKeys,
    funcKeys,
    allKeys,
    noLogging
});
