import {delay, filter, map, switchMap, takeUntil, withLatestFrom} from 'rxjs/operators';
import {combineEpics, ofType} from 'redux-observable';
import {Observable, timer} from 'rxjs';
import {ActionTypes} from '../actions';
import {SnakeActions} from './snakeActions';
import {AppState} from '../appState';
import {Direction, GameType, Point} from '../../domain';
import {Specs} from '../../Specs';
import {SnakeGameState} from './snakeState';
import {CoreActions} from '../core/';
import {AppAction} from '../index';

const BASIC_INTERVAL = Specs.snakeGame.baseCreepIntervalMs;

function nextCreepAction(appState: AppState) {
    let action: AppAction;
    const s: SnakeGameState = appState.snake;
    const head = newHeadPoint(s.direction, s.body.last()); // last is head
    if (head.equals(s.hole)) {
        action = SnakeActions.escape();
    } else if (isHittingWall(head)) {
        action = s.life <= 1 ? CoreActions.exitGame() : SnakeActions.hitWall();
    } else if (s.body.contains(head)) {
        action = s.life <= 1 ? CoreActions.exitGame() : SnakeActions.biteSelf();
    } else {
        const grown = head.equals(s.bean);
        action = SnakeActions.creep(head, grown);
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
    return head.x < 1 || head.x >= Specs.graphicWidth - 1 || head.y < 1 || head.y >= Specs.graphicHeight - 1;
}

function calculateInterval(level: number): number {
    return BASIC_INTERVAL - level * 100;
}

const creepFunc = (creepActionFunc: (state: AppState) => AppAction) =>
    (action$: Observable<AppAction>, state$: Observable<AppState>) => { // todo: use WIN / FAIL to control
        return action$.pipe(
            ofType(ActionTypes.ENTER_GAME),
            withLatestFrom(state$),
            map(([, s]) => s),
            filter(s => s.core.gameType === GameType.SNAKE),
            switchMap(state => {
                const interval = calculateInterval(state.core.level);
                return timer(interval, interval).pipe(
                    takeUntil(action$.pipe(ofType(ActionTypes.EXIT_GAME, ActionTypes.SNAKE_WIN))),
                    withLatestFrom(state$),
                    map(([, s]) => s),
                    filter(s => !s.core.inGamePaused),
                    map(creepActionFunc)
                );
            }),
        );
    };
const creepEpic = creepFunc(nextCreepAction);

const SCORE_BASE = Specs.snakeGame.baseScore;
const scoreEpic = (action$: Observable<AppAction>,
                   state$: Observable<AppState>) => {
    return action$.pipe(
        filter(a => (a.type === ActionTypes.SNAKE_CREEP && a.payload.grown) || a.type === ActionTypes.SNAKE_WIN),
        withLatestFrom(state$),
        map(([a, s]) => {
            const level = s.core.level;
            const bodyLength = s.snake.body.size;
            const winBonus = a.type === ActionTypes.SNAKE_WIN ? 3 : 1;
            const score = SCORE_BASE * bodyLength + SCORE_BASE * level;
            return CoreActions.addScore(score * winBonus);
        }),
    );
};

const ESCAPE_INTERVAL = Specs.snakeGame.escapeAnimationIntervalMs;
const escapeEpic = (action$: Observable<AppAction>,
                    state$: Observable<AppState>) => {
    return action$.pipe(
        ofType(ActionTypes.SNAKE_ESCAPE),
        delay(ESCAPE_INTERVAL),
        withLatestFrom(state$),
        map(([, s]) => s.snake.body.size <= 0 ? SnakeActions.win() : SnakeActions.escape()),
    );
};

export const snakeEpic = {
    epic: combineEpics(creepEpic, scoreEpic, escapeEpic),
    _creepFunc: creepFunc,
    _scoreEpic: scoreEpic,
    _escapeEpic: escapeEpic,
    _nextCreepAction: nextCreepAction,
    BASIC_INTERVAL,
    SCORE_BASE,
    ESCAPE_INTERVAL
};
