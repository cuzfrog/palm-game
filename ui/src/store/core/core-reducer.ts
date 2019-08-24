import produce from "immer";
import { checkStrictEqual, checkStrictNonEqual, nextEnum } from "src/utils";
import { ActionType } from "../action";
import { Specs } from "src/specs";
import { GameType, SystemStatus, GameStatus } from "src/domain";
import { Anim, Animations } from "../graphic";
import { CoreState } from "./core-state";

const GameTypeValues: ReadonlyArray<GameType> = Object.keys(GameType).map(key => GameType[key]);

export function coreReducer(state: CoreState = CoreState.Default, action: CoreAction): CoreState {
  return produce(state, draft => {
    switch (action.type) {
      case ActionType.ADD_SCORE:
        draft.scores = state.scores.update(state.gameType, prev => add(prev, action.payload));
        break;
      case ActionType.ADD_COUNT:
        draft.counts = state.counts.update(state.gameType, prev => add(prev, action.payload));
        break;
      case ActionType.INCREASE_LEVEL:
        const li = state.getLevel();
        draft.level = state.level.set(state.gameType, li >= Specs.core.maxLevel ? 1 : li + 1);
        break;
      case ActionType.DECREASE_LEVEL:
        const ld = state.getLevel();
        draft.level = state.level.set(state.gameType, ld <= 1 ? Specs.core.maxLevel : ld - 1);
        break;
      case ActionType.CONSOLE_START:
        draft.anim = Animations.consoleStartInitial;
        break;
      case ActionType.CONSOLE_ANIMATE:
        if (draft.anim.isCompleted()) {
          if (state.status === SystemStatus.STARTING) {
            draft.status = SystemStatus.MENU;
          }
          draft.anim = currentAnimation(state);
        } else {
          draft.anim = draft.anim.advance();
        }
        break;
      case ActionType.TOGGLE_PAUSE:
        checkStrictEqual(state.status, SystemStatus.IN_GAME, "cannot pause game if not in game.");
        draft.gameStatus = state.gameStatus === GameStatus.RUNNING ? GameStatus.PAUSED : GameStatus.RUNNING;
        break;
      case ActionType.ENTER_GAME:
        checkStrictEqual(state.status, SystemStatus.MENU, "can only enter game from menu.");
        draft.scores = state.scores.set(state.gameType, 0);
        draft.anim = Animations.emptyAnim;
        draft.status = SystemStatus.IN_GAME;
        draft.gameStatus = GameStatus.RUNNING;
        break;
      case ActionType.EXIT_GAME:
        checkStrictEqual(state.status, SystemStatus.IN_GAME, "cannot exit game if not in game.");
        draft.status = SystemStatus.MENU;
        draft.maxScores = state.scores.mergeWith(maxFunc, state.maxScores);
        break;
      case ActionType.TOGGLE_GAME:
        checkStrictNonEqual(state.status, SystemStatus.IN_GAME, "cannot toggle game when in game.");
        draft.gameType = nextEnum(state.gameType, GameTypeValues);
        draft.anim = currentAnimation(draft as CoreState);
        break;
      case ActionType.QUIT_GAME:
        draft.gameStatus = action.payload ? GameStatus.STOPPED : GameStatus.TO_QUIT;
        break;
      case ActionType.ENABLE_SOUND:
        draft.audioEnabled = true;
        break;
      case ActionType.DISABLE_SOUND:
        draft.audioEnabled = false;
        break;
    }
  }
  );
}

function add(prevScore: number | undefined, payload: number): number {
  const base = prevScore ? prevScore : 0;
  return base + Math.round(payload);
}

function maxFunc(s1: number | undefined, s2: number | undefined) {
  const v1 = s1 ? s1 : 0;
  const v2 = s2 ? s2 : 0;
  return Math.max(v1, v2);
}

function currentAnimation(state: CoreState): Anim {
  let nextAnim = Animations.emptyAnim;
  switch (state.status) {
    case SystemStatus.STARTING:
    case SystemStatus.MENU:
      switch (state.gameType) {
        case GameType.SNAKE:
          nextAnim = Animations.snakeInitial;
          break;
        case GameType.TETRIS:
          nextAnim = Animations.tetrisInitial;
      }
  }
  return nextAnim;
}
