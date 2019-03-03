import {KeyboardProps} from '../console/keyboard/Keyboard';
import {Direction} from '../domain';
import {ActionTypes} from './actions';
import {CoreActions} from './core/coreActions';
import {createAction} from './typeHelper';
import {SnakeActions} from './games/snakeActions';
import {GameType, CoreState, SystemStatus} from './core/coreState';

const DummyAction = createAction(ActionTypes.DUMMY_ACTION);

const MenuKeyboardLayout: KeyboardProps = {
    funcProps: {
        selectAction: CoreActions.toggleGame(),
        startAction: CoreActions.enterGame(),
    },
    arrowProps: {
        leftAction: CoreActions.decreaseLevel(),
        rightAction: CoreActions.increaseLevel(),
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
        startAction: CoreActions.togglePause(),
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
        startAction: CoreActions.togglePause(),
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
