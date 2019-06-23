import produce from 'immer';
import {List, Range} from 'immutable';
import {DefaultSnakeGameState, SnakeGameState} from './snakeState';
import {SnakeAction, ActionTypes} from '../action';
import {isOppositeDirection, Point} from '../../domain';
import {Specs} from '../../Specs';
import {randomInt} from '../../utils';

const WIN_BODY_LENGTH = Specs.snakeGame.winBodyLength;

export function snakeGameReducer(state: SnakeGameState = DefaultSnakeGameState, action: SnakeAction): SnakeGameState {
    return produce(state, draft => {
        switch (action.type) {
            case ActionTypes.SET_DIRECTION:
                if (!isOppositeDirection(state.direction, action.payload) && state.direction !== action.payload) {
                    draft.direction = action.payload;
                }
                return;
            case ActionTypes.SNAKE_CREEP:
                const {head, grown} = action.payload;
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
            case ActionTypes.SNAKE_HIT_WALL:
            case ActionTypes.SNAKE_BITE_SELF:
                return {
                    ...DefaultSnakeGameState,
                    life: state.life - 1,
                };
            case ActionTypes.SNAKE_ESCAPE:
                draft.body = state.body.takeLast(state.body.size - 1);
                return;
            case ActionTypes.SNAKE_WIN:
                draft.body = DefaultSnakeGameState.body;
                draft.direction = DefaultSnakeGameState.direction;
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
