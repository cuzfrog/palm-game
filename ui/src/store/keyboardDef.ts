import {KeyboardProps} from '../console';
import {Direction, GameType, SystemStatus} from '../domain';
import {ActionTypes} from './actions';
import {CoreActions, CoreState} from './core';
import {createAction} from './typeHelper';
import {SnakeActions} from './games/snakeActions';

const DummyAction = createAction(ActionTypes.DUMMY_ACTION);

const DummyKeyboardLayout: KeyboardProps = {
    selectAction: DummyAction,
    startAction: DummyAction,

    leftAction: DummyAction,
    rightAction: DummyAction,
    upAction: DummyAction,
    downAction: DummyAction,

    actionA: DummyAction,
    actionB: DummyAction,
};

const MenuKeyboardLayout: KeyboardProps = {
    ...DummyKeyboardLayout,
    selectAction: CoreActions.toggleGame(),
    startAction: CoreActions.enterGame(),

    leftAction: CoreActions.decreaseLevel(),
    rightAction: CoreActions.increaseLevel(),
};

const PauseKeyboardLayout: KeyboardProps = {
    ...DummyKeyboardLayout,
    startAction: CoreActions.togglePause(),
};

const SnakeGameKeyboardLayout: KeyboardProps = {
    ...DummyKeyboardLayout,
    startAction: CoreActions.togglePause(),

    upAction: SnakeActions.setDirection(Direction.NORTH),
    rightAction: SnakeActions.setDirection(Direction.EAST),
    downAction: SnakeActions.setDirection(Direction.SOUTH),
    leftAction: SnakeActions.setDirection(Direction.WEST),
};

function getGameKeyboard(gameType: GameType): KeyboardProps {
    switch (gameType) {
        case GameType.SNAKE:
            return SnakeGameKeyboardLayout;
        default:
            throw new TypeError('Unknown enum type:' + gameType);
    }
}

export type KeyboardDef = KeyboardProps;

export function getKeyboard(state?: CoreState): KeyboardDef {
    let keyboard;
    if (state === undefined || state.status === SystemStatus.MENU) {
        keyboard = MenuKeyboardLayout;
    } else if (state.status === SystemStatus.IN_GAME) {
        keyboard = state.inGamePaused ? PauseKeyboardLayout : getGameKeyboard(state.gameType);
    } else {
        throw new TypeError('Unknown system status:' + state.status);
    }
    return keyboard;
}
