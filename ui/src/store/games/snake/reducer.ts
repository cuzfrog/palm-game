import {SnakeGameState} from './state';
import {SnakeAction} from './actions';
import {ActionTypes} from '../../actions';
import {InitialState} from '../../index';
import {Point} from '../../types';
import {List} from 'immutable';
import {ConsoleSpecs} from '../../../console/Specs';

export function snakeGameReducer(state: SnakeGameState, action: SnakeAction): SnakeGameState {
    switch (action.type) {
        case ActionTypes.SET_DIRECTION:
            return {
                ...state,
                direction: action.payload
            };
        case ActionTypes.SNAKE_HIT_WALL || ActionTypes.SNAKE_BITE_SELF:
            if (state.life > 1) {
                return {
                    ...InitialState.snake,
                    life: state.life - 1,
                };
            } else {
                return InitialState.snake;
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
        const bean = {
            x: getRandomInt(ConsoleSpecs.graphicWidth),
            y: getRandomInt(ConsoleSpecs.graphicHeight),
        };
        if (!body.contains(bean)) {
            return bean;
        }
    }
    return undefined;
}

function getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
}
