import produce from 'immer';
import {List, Range} from 'immutable';
import {DefaultSnakeGameState, SnakeGameState} from './snakeState';
import {SnakeAction} from './snakeActions';
import {ActionTypes} from '../actions';
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
            default:
                return;
        }
    });
}

const beginX = 1;
const beginY = 1;
const endX = Specs.graphicWidth - 1;
const endY = Specs.graphicHeight - 1;

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
    const bottom = Range(beginX, endX).map(x => Point(x, Specs.graphicHeight - 1));
    const left = Range(beginY, endY).map(y => Point(0, y));
    const right = Range(beginY, endY).map(y => Point(Specs.graphicWidth - 1, y));
    return top.concat(bottom, left, right).toList();
})();
