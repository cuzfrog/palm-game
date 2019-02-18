import {DefaultSnakeGameState, SnakeGameState} from './snakeState';
import {SnakeAction} from './snakeActions';
import {ActionTypes} from '../../actions';
import {isOppositeDirection, Point} from '../../types';
import {List} from 'immutable';
import {Specs} from '../../../Specs';
import {randomInt} from '../../../utils';

export function snakeGameReducer(state: SnakeGameState = DefaultSnakeGameState, action: SnakeAction): SnakeGameState {
    switch (action.type) {
        case ActionTypes.SET_DIRECTION:
            if (isOppositeDirection(state.direction, action.payload) || state.direction === action.payload) {
                return state;
            } else {
                return {
                    ...state,
                    direction: action.payload
                };
            }
        case ActionTypes.SNAKE_HIT_WALL:
        case ActionTypes.SNAKE_BITE_SELF:
            if (state.life > 1) {
                return {
                    ...DefaultSnakeGameState,
                    life: state.life - 1,
                };
            } else {
                return DefaultSnakeGameState;
            }
        case ActionTypes.SNAKE_CREEP:
            const {head, grown} = action.payload;
            const length = state.body.size;
            const body = state.body.toSeq().concat(head).takeLast(grown ? length + 1 : length).toList();
            return {
                ...state,
                body,
                bean: grown ? undefined : (state.bean ? state.bean : generateBean(body)),
            };
        default:
            return state;
    }
}

function generateBean(body: List<Point>): Point | undefined {
    if (Math.random() > 0.5) {
        const bean = Point(randomInt(Specs.graphicWidth), randomInt(Specs.graphicHeight));
        if (!body.contains(bean)) {
            return bean;
        }
    }
    return undefined;
}
