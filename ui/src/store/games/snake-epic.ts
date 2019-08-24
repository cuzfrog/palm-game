import { combineEpics, ofType } from "redux-observable";
import { Observable, of } from "rxjs";
import { delay, filter, map, mapTo, withLatestFrom, concatMap } from "rxjs/operators";
import { Direction, Point, GameType } from "src/domain";
import { Specs } from "src/specs";
import { ActionType, SnakeActions } from "../action";
import { CoreActions } from "../core";
import { heartbeatFunc } from "./common-epic";

function nextCreepAction(appState: AppState): SnakeAction {
  let action: AppAction;
  const s: SnakeGameState = appState.snake;
  const head = newHeadPoint(s.direction, s.body.last()); // last is head
  if (head.equals(s.hole)) {
    action = SnakeActions.escape(0);
  } else if (isHittingWall(head)) {
    action = SnakeActions.hitWall();
  } else if (s.body.contains(head)) {
    action = SnakeActions.biteSelf();
  } else {
    const grown = head.equals(s.bean);
    action = SnakeActions.creep(head, grown);
  }
  return action;
}
const BASIC_INTERVAL = Specs.snakeGame.baseCreepIntervalMs;
const creepEpic = heartbeatFunc(
  GameType.SNAKE, BASIC_INTERVAL, [ActionType.GAME_NEXT_LEVEL], [ActionType.SNAKE_ESCAPE], nextCreepAction);

function newHeadPoint(direction: Direction, head: Point): Point {
  switch (direction) {
    case Direction.NORTH:
      return Point(head.x, head.y - 1);
    case Direction.EAST:
      return Point(head.x + 1, head.y);
    case Direction.SOUTH:
      return Point(head.x, head.y + 1);
    case Direction.WEST:
      return Point(head.x - 1, head.y);
    default:
      throw new TypeError("UnknownDirection:" + direction);
  }
}

function isHittingWall(head: Point): boolean {
  return head.x < 1 || head.x >= Specs.screen.graphicWidth - 1 || head.y < 1 || head.y >= Specs.screen.graphicHeight - 1;
}

const SCORE_BASE = Specs.snakeGame.baseScore;
const scoreEpic = (action$: Observable<AppAction>, state$: Observable<AppState>) => {
  return action$.pipe(
    filter(a => (a.type === ActionType.SNAKE_CREEP && a.payload.grown) || a.type === ActionType.GAME_WIN),
    withLatestFrom(state$),
    concatMap(([a, s]) => {
      const level = s.core.getLevel();
      const bodyLength = s.snake.body.size;
      const winBonus = a.type === ActionType.GAME_WIN ? 3 : 1;
      const score = SCORE_BASE * bodyLength + SCORE_BASE * level;
      return of(CoreActions.addScore(score * winBonus), CoreActions.addCount(1));
    }),
  );
};

const ESCAPE_INTERVAL = Specs.snakeGame.escapeAnimationIntervalMs;
const escapeEpic = (action$: Observable<AppAction>, state$: Observable<AppState>) => {
  return action$.pipe(
    ofType(ActionType.SNAKE_ESCAPE),
    map(a => {
      if (a.type === ActionType.SNAKE_ESCAPE) {
        return a.payload;
      } else {
        throw new TypeError("Assertion error: impossible to reach here!");
      }
    }),
    delay(ESCAPE_INTERVAL),
    withLatestFrom(state$),
    map(([step, s]) => {
      return s.snake.body.size <= 0 ? CoreActions.win() : SnakeActions.escape(step + 1);
    }),
  );
};

const exitEpic = (action$: Observable<AppAction>, state$: Observable<AppState>) => {
  return action$.pipe(
    ofType(ActionType.SNAKE_HIT_WALL, ActionType.SNAKE_BITE_SELF),
    withLatestFrom(state$),
    filter(([, s]) => s.snake.life < 1),
    mapTo(CoreActions.exitGame())
  );
};

export const snakeEpic = {
  epic: combineEpics(creepEpic, scoreEpic, escapeEpic, exitEpic),
  _scoreEpic: scoreEpic,
  _escapeEpic: escapeEpic,
  _nextCreepAction: nextCreepAction,
  _exitEpic: exitEpic,
  BASIC_INTERVAL,
  SCORE_BASE,
  ESCAPE_INTERVAL
};
