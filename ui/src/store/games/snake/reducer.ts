import {SnakeGameState} from './state';
import {SnakeAction} from './actions';
import {ActionTypes} from '../../actions';
import {InitialState} from '../../index';
import {Direction, Point} from '../../types';
import {List} from 'immutable';
import {ConsoleSpecs} from '../../../console/Specs';

export function snakeGameReducer(state: SnakeGameState, action: SnakeAction): SnakeGameState {
    switch (action.type) {
        case ActionTypes.SET_DIRECTION:
            return {
                ...state,
                direction: action.payload
            };
        case ActionTypes.SNAKE_ENTER_HOLE:
            throw new TypeError('Not implemented');
        case ActionTypes.SNAKE_EAT_BEAN:
            return {
                ...state,
                ingestedBean: true
            };
        case ActionTypes.SNAKE_CREEP:
            const head = newHeadPoint(state.direction, state.body.last()); // last is head
            if (isHittingWall(head) || state.body.contains(head)) {
                if (state.life > 1) {
                    return {
                        ...InitialState.snake,
                        life: state.life - 1,
                    };
                } else {
                    return InitialState.snake;
                }
            } else {
                const length = state.body.size;
                const body = state.body.toSeq().concat(head).takeLast(state.ingestedBean ? length + 1 : length).toList();
                return {
                    ...state,
                    body,
                    ingestedBean: state.bean ? state.bean === head : false,
                    bean: state.bean ? state.bean : generateBean(body),
                };
            }
        default:
            return state;
    }
}

function newHeadPoint(direction: Direction, headPoint: Point): Point {
    switch (direction) {
        case Direction.NORTH:
            return {
                x: headPoint.x,
                y: headPoint.y - 1,
            };
        case Direction.EAST:
            return {
                x: headPoint.x + 1,
                y: headPoint.y,
            };
        case Direction.SOUTH:
            return {
                x: headPoint.x,
                y: headPoint.y + 1,
            };
        case Direction.WEST:
            return {
                x: headPoint.x - 1,
                y: headPoint.y,
            };
    }
}

function isHittingWall(head: Point): boolean {
    return head.x < 0 || head.x >= ConsoleSpecs.graphicWidth || head.y < 0 || head.y >= ConsoleSpecs.graphicHeight;
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
