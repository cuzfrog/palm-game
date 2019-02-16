import {cancel, delay, fork, put, select, take} from 'redux-saga/effects';
import {ActionTypes} from '../../actions';
import {SnakeActions} from './snakeActions';
import {AppState} from '../../index';
import {GameType} from '../../system/systemState';
import {Direction, Point} from '../../types';
import {Specs} from '../../../Specs';
import {SnakeGameState} from './snakeState';
import _ from 'lodash';

const BASIC_INTERVAL = 900; // ms

const getState = (state: AppState) => state;

function* creep(state: SnakeGameState, creepInterval: number) {
    while (true) {
        yield delay(creepInterval);
        const head = newHeadPoint(state.direction, state.body.last()); // last is head
        if (isHittingWall(head)) {
            yield put(SnakeActions.hitWall());
        } else if (state.body.contains(head)) {
            yield put(SnakeActions.biteSelf());
        } else {
            yield put(SnakeActions.creep(head, _.isEqual(head, state.bean)));
        }
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
    return head.x < 0 || head.x >= Specs.graphicWidth || head.y < 0 || head.y >= Specs.graphicHeight;
}

function calculateInterval(level: number): number {
    return BASIC_INTERVAL - level * 100;
}

export function* snakeSaga() {
    while (yield take(ActionTypes.ENTER_GAME)) {
        const state: AppState = yield select(getState);
        const interval = calculateInterval(state.sys.level);
        let creepTask;
        if (state.sys.gameType === GameType.SNAKE && !state.sys.inGamePaused) {
            creepTask = yield fork(creep, state.snake, interval);
        }
        yield take(ActionTypes.EXIT_GAME);
        yield cancel(creepTask);
    }
}
