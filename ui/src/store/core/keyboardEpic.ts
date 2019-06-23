import {Observable} from 'rxjs';
import {AppAction, AppState, CoreActions, CoreState, SnakeActions} from '../index';
import {filter, map} from 'rxjs/operators';
import {Direction, GameType, SystemStatus} from '../../domain';
import {ofType, StateObservable} from 'redux-observable';
import {ActionTypes} from '../action';

function dummyLayout(): AppAction {
    return CoreActions.dummy();
}

function mapToMenuLayout(action: AppAction): AppAction {
    switch (action.type) {
        case ActionTypes.SELECT:
            return CoreActions.toggleGame();
        case ActionTypes.START:
            return CoreActions.enterGame();
        case ActionTypes.LEFT:
            return CoreActions.decreaseLevel();
        case ActionTypes.RIGHT:
            return CoreActions.increaseLevel();
        default:
            return CoreActions.dummy();
    }
}

function mapToPausedLayout(action: AppAction): AppAction {
    switch (action.type) {
        case ActionTypes.START:
            return CoreActions.togglePause();
        default:
            return CoreActions.dummy();
    }
}

function mapToSnakeLayout(action: AppAction): AppAction {
    switch (action.type) {
        case ActionTypes.START:
            return CoreActions.togglePause();
        case ActionTypes.UP:
            return SnakeActions.setDirection(Direction.NORTH);
        case ActionTypes.RIGHT:
            return SnakeActions.setDirection(Direction.EAST);
        case ActionTypes.DOWN:
            return SnakeActions.setDirection(Direction.SOUTH);
        case ActionTypes.LEFT:
            return SnakeActions.setDirection(Direction.WEST);
        default:
            return CoreActions.dummy();
    }
}

function chooseKeyboardLayout(state: CoreState): (action: AppAction) => AppAction {
    let keyboard;
    if (state.status === SystemStatus.STARTING) {
        keyboard = dummyLayout;
    } else if (state.status === SystemStatus.MENU) {
        keyboard = mapToMenuLayout;
    } else if (state.status === SystemStatus.IN_GAME) {
        keyboard = state.inGamePaused ? mapToPausedLayout : getGameKeyboard(state.gameType);
    } else {
        throw new TypeError('Unknown system status:' + state.status);
    }
    return keyboard;
}

function getGameKeyboard(gameType: GameType): (action: AppAction) => AppAction {
    switch (gameType) {
        case GameType.SNAKE:
            return mapToSnakeLayout;
        default:
            throw new TypeError('Unknown enum type:' + gameType);
    }
}

const epic = (action$: Observable<AppAction>, state$: StateObservable<AppState>) => {
    return action$.pipe(
        ofType(ActionTypes.UP, ActionTypes.RIGHT, ActionTypes.DOWN, ActionTypes.LEFT,
            ActionTypes.SELECT, ActionTypes.START, ActionTypes.A, ActionTypes.B),
        map(a => {
            const mapFunc = chooseKeyboardLayout(state$.value.core);
            return mapFunc(a);
        }),
        filter(a => a.type !== ActionTypes.DUMMY_ACTION)
    );
};

export const keyboardEpic = {
    epic,
};
