import {filter, map, switchMap, takeUntil, withLatestFrom} from 'rxjs/operators';
import {ofType} from 'redux-observable';
import {Action} from 'redux';
import {Observable, timer} from 'rxjs';
import _ from 'lodash';
import {ActionTypes} from '../actions';
import {SnakeActions} from './snakeActions';
import {AppState} from '../appState';
import {Direction, GameType, Point} from '../../domain';
import {Specs} from '../../Specs';
import {SnakeGameState} from './snakeState';
import {CoreActions} from '../core/';

const BASIC_INTERVAL = 900; // ms

function nextCreepAction(appState: AppState) {
    let action: Action;
    const s: SnakeGameState = appState.snake;
    const head = newHeadPoint(s.direction, s.body.last()); // last is head
    if (isHittingWall(head)) {
        action = s.life <= 1 ? CoreActions.exitGame() : SnakeActions.hitWall();
    } else if (s.body.contains(head)) {
        action = s.life <= 1 ? CoreActions.exitGame() : SnakeActions.biteSelf();
    } else {
        action = SnakeActions.creep(head, _.isEqual(head, s.bean));
    }
    return action;
}

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
            throw new TypeError('UnknownDirection:' + direction);
    }
}

function isHittingWall(head: Point): boolean {
    return head.x < 0 || head.x >= Specs.graphicWidth || head.y < 0 || head.y >= Specs.graphicHeight;
}

function calculateInterval(level: number): number {
    return BASIC_INTERVAL - level * 100;
}

const snakeEpicFunc = (action$: Observable<Action>,
                       state$: Observable<AppState>,
                       creepActionFunc: (state: AppState) => Action) => {
    return action$.pipe(
        ofType(ActionTypes.ENTER_GAME),
        withLatestFrom(state$),
        map(([, s]) => s),
        filter(s => s.core.gameType === GameType.SNAKE),
        switchMap(state => {
            const interval = calculateInterval(state.core.level);
            return timer(interval, interval).pipe(
                takeUntil(action$.pipe(ofType(ActionTypes.EXIT_GAME))),
                withLatestFrom(state$),
                map(([, s]) => s),
                filter(s => !s.core.inGamePaused),
                map(creepActionFunc)
            );
        }),
    );
};

export const snakeEpic = {
    epic: (a$: Observable<Action>, s$: Observable<AppState>) => snakeEpicFunc(a$, s$, nextCreepAction),
    _snakeEpicFunc: snakeEpicFunc,
    _nextCreepAction: nextCreepAction,
    BASIC_INTERVAL,
};
