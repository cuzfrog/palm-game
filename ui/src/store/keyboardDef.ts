import {KeyboardProps} from '../console/keyboard/Keyboard';
import {Direction} from '../domain';
import {ActionTypes} from './actions';
import {SystemActions} from './system/systemActions';
import {createAction} from './typeHelper';
import {SnakeActions} from './games/snake/snakeActions';
import {GameType, SystemState, SystemStatus} from './system/systemState';

const DummyAction = createAction(ActionTypes.DUMMY_ACTION);

const MenuKeyboardLayout: KeyboardProps = {
    funcProps: {
        selectAction: SystemActions.toggleGame(),
        startAction: SystemActions.enterGame(),
    },
    arrowProps: {
        leftAction: SystemActions.decreaseLevel(),
        rightAction: SystemActions.increaseLevel(),
        upAction: DummyAction,
        downAction: DummyAction,
    },
    mainProps: {
        actionA: DummyAction,
        actionB: DummyAction,
    }
};

const PauseKeyboardLayout: KeyboardProps = {
    funcProps: {
        selectAction: DummyAction,
        startAction: SystemActions.togglePause(),
    },
    arrowProps: {
        leftAction: DummyAction,
        rightAction: DummyAction,
        upAction: DummyAction,
        downAction: DummyAction,
    },
    mainProps: {
        actionA: DummyAction,
        actionB: DummyAction,
    }
};

const SnakeGameKeyboardLayout: KeyboardProps = {
    funcProps: {
        selectAction: DummyAction,
        startAction: SystemActions.togglePause(),
    },
    arrowProps: {
        upAction: SnakeActions.setDirection(Direction.NORTH),
        rightAction: SnakeActions.setDirection(Direction.EAST),
        downAction: SnakeActions.setDirection(Direction.SOUTH),
        leftAction: SnakeActions.setDirection(Direction.WEST),
    },
    mainProps: {
        actionB: DummyAction,
        actionA: DummyAction,
    }
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

export function getKeyboard(state?: SystemState): KeyboardDef {
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
