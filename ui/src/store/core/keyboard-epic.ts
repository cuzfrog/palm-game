import { Observable } from "rxjs";
import { ofType, StateObservable } from "redux-observable";
import { filter, map } from "rxjs/operators";
import { Direction, GameType, SystemStatus, GameStatus } from "src/domain";
import { ActionType, SnakeActions } from "../action";
import { CoreActions } from "../core";
import { TetrisActions } from "../action/tetris-actions";

function dummyLayout(): AppAction {
  return CoreActions.dummy();
}

function mapToMenuLayout(action: KeyboardAction): AppAction {
  switch (action.type) {
    case ActionType.SELECT:
      return CoreActions.toggleGame();
    case ActionType.START:
      return CoreActions.enterGame();
    case ActionType.LEFT:
      return CoreActions.decreaseLevel();
    case ActionType.RIGHT:
      return CoreActions.increaseLevel();
    default:
      return CoreActions.dummy();
  }
}

function mapToPausedLayout(action: KeyboardAction, state: CoreState): AppAction {
  switch (action.type) {
    case ActionType.START:
      return CoreActions.togglePause();
    case ActionType.SELECT:
      return CoreActions.quitGame(state.gameStatus === GameStatus.TO_QUIT);
    default:
      return CoreActions.dummy();
  }
}

function mapToSnakeLayout(action: KeyboardAction): AppAction {
  switch (action.type) {
    case ActionType.UP:
      return SnakeActions.setDirection(Direction.NORTH);
    case ActionType.RIGHT:
      return SnakeActions.setDirection(Direction.EAST);
    case ActionType.DOWN:
      return SnakeActions.setDirection(Direction.SOUTH);
    case ActionType.LEFT:
      return SnakeActions.setDirection(Direction.WEST);
    case ActionType.START:
      return CoreActions.togglePause();
    default:
      return CoreActions.dummy();
  }
}

function mapToTetrisLayout(action: KeyboardAction): AppAction {
  switch (action.type) {
    case ActionType.RIGHT:
      return TetrisActions.move(1);
    case ActionType.DOWN:
      return TetrisActions.descend("manual");
    case ActionType.LEFT:
      return TetrisActions.move(-1);
    case ActionType.A:
      return TetrisActions.hardDrop();
    case ActionType.B:
      return TetrisActions.rotate();
    case ActionType.START:
      return CoreActions.togglePause();
    default:
      return CoreActions.dummy();
  }
}

function chooseKeyboardLayout(state: CoreState): (action: AppAction, state: CoreState) => AppAction {
  let keyboard;
  if (state.status === SystemStatus.STARTING) {
    keyboard = dummyLayout;
  } else if (state.status === SystemStatus.MENU) {
    keyboard = mapToMenuLayout;
  } else if (state.status === SystemStatus.IN_GAME) {
    keyboard = state.isPaused() ? mapToPausedLayout : getGameKeyboard(state.gameType);
  } else {
    throw new TypeError("Unknown system status:" + state.status);
  }
  return keyboard;
}

function getGameKeyboard(gameType: GameType): (action: AppAction) => AppAction {
  switch (gameType) {
    case GameType.SNAKE:
      return mapToSnakeLayout;
    case GameType.TETRIS:
      return mapToTetrisLayout;
    default:
      throw new TypeError("Unknown enum type:" + gameType);
  }
}

const epic = (action$: Observable<AppAction>, state$: StateObservable<AppState>) => {
  return action$.pipe(
    ofType(ActionType.UP, ActionType.RIGHT, ActionType.DOWN, ActionType.LEFT,
      ActionType.SELECT, ActionType.START, ActionType.A, ActionType.B),
    map(a => {
      const s = state$.value.core;
      const mapFunc = chooseKeyboardLayout(s);
      return mapFunc(a, s);
    }),
    filter(a => a.type !== ActionType.DUMMY_ACTION)
  );
};

export const keyboardEpic = {
  epic,
};
