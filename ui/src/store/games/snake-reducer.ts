import produce from 'immer';
import { List, Range } from 'immutable';
import { SnakeGameState } from './snake-state';
import { ActionType } from '../action';
import { isOppositeDirection, Point } from 'src/domain';
import { Specs } from 'src/specs';
import { randomInt } from 'src/utils';

const WIN_BODY_LENGTH = Specs.snakeGame.winBodyLength;

export function snakeGameReducer(state: SnakeGameState = SnakeGameState.Default, action: AppAction): SnakeGameState {
  return produce(state, draft => {
    switch (action.type) {
      case ActionType.SET_DIRECTION:
        if (!isOppositeDirection(state.direction, action.payload) && state.direction !== action.payload) {
          draft.direction = action.payload;
        }
        return;
      case ActionType.SNAKE_CREEP:
        const { head, grown } = action.payload;
        const length = state.body.size;
        const body = state.body.toSeq().concat(head).takeLast(grown ? length + 1 : length).toList();
        draft.body = body;
        if (body.size >= WIN_BODY_LENGTH) {
          draft.hole = state.hole ? state.hole : border.get(randomInt(border.size - 1));
          draft.bean = undefined;
        } else {
          draft.bean = grown ? undefined : (state.bean ? state.bean : generateBean(body));
        }
        return;
      case ActionType.SNAKE_HIT_WALL:
      case ActionType.SNAKE_BITE_SELF:
        return {
          ...SnakeGameState.Default,
          life: state.life - 1,
        };
      case ActionType.SNAKE_ESCAPE:
        draft.body = state.body.takeLast(state.body.size - 1);
        return;
      case ActionType.GAME_WIN:
        draft.body = SnakeGameState.Default.body;
        draft.direction = SnakeGameState.Default.direction;
        draft.hole = undefined;
        return;
      default:
        return;
    }
  });
}

const beginX = 1;
const beginY = 1;
const endX = Specs.screen.graphicWidth - 1;
const endY = Specs.screen.graphicHeight - 1;

function generateBean(body: List<Point>): Point | undefined {
  if (Math.random() > Specs.snakeGame.beanProduceChance) {
    const bean = Point(randomInt(endX, beginX), randomInt(endY, beginY));
    if (!body.contains(bean)) {
      return bean;
    }
  }
  return undefined;
}

const border = (() => {
  const top = Range(beginX, endX).map(x => Point(x, 0));
  const bottom = Range(beginX, endX).map(x => Point(x, endY));
  const left = Range(beginY, endY).map(y => Point(0, y));
  const right = Range(beginY, endY).map(y => Point(endX, y));
  return top.concat(bottom, left, right).toList();
})();
