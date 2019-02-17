import {KeyboardProps} from '../console/keyboard/Keyboard';
import {Direction} from './types';
import {ActionTypes} from './actions';
import {SystemActions} from './system/systemActions';
import {createAction} from './typeHelper';
import {SnakeActions} from './games/snake/snakeActions';
import {GameType} from './system/systemState';

export const Actions = { // todo move to proper location
    sys: SystemActions,
    snake: SnakeActions,
    dummy: createAction(ActionTypes.DUMMY_ACTION),
};

export const MenuKeyboardLayout: Readonly<KeyboardProps> = {
    funcProps: {
        selectAction: SystemActions.toggleGame(),
        startAction: SystemActions.enterGame(),
    },
    arrowProps: {
        leftAction: SystemActions.decreaseLevel(),
        rightAction: SystemActions.increaseLevel(),
        upAction: Actions.dummy,
        downAction: Actions.dummy,
    },
    mainProps: {
        actionA: Actions.dummy,
        actionB: Actions.dummy,
    }
};

export const PauseKeyboardLayout: Readonly<KeyboardProps> = {
    funcProps: {
        selectAction: Actions.dummy,
        startAction: SystemActions.togglePause(),
    },
    arrowProps: {
        leftAction: Actions.dummy,
        rightAction: Actions.dummy,
        upAction: Actions.dummy,
        downAction: Actions.dummy,
    },
    mainProps: {
        actionA: Actions.dummy,
        actionB: Actions.dummy,
    }
};

const SnakeGameKeyboardLayout: Readonly<KeyboardProps> = {
    funcProps: {
        selectAction: Actions.dummy,
        startAction: SystemActions.togglePause(),
    },
    arrowProps: {
        upAction: Actions.snake.setDirection(Direction.NORTH),
        rightAction: Actions.snake.setDirection(Direction.EAST),
        downAction: Actions.snake.setDirection(Direction.SOUTH),
        leftAction: Actions.snake.setDirection(Direction.WEST),
    },
    mainProps: {
        actionB: Actions.dummy,
        actionA: Actions.dummy,
    }
};

export function getGameKeyboard(gameType: GameType): KeyboardProps {
    switch (gameType) {
        case GameType.SNAKE:
            return SnakeGameKeyboardLayout;
        default:
            throw new TypeError('Unknown enum type:' + gameType);
    }
}
