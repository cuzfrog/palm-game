import {concatMap, delay, filter, map, mapTo, switchMap, takeUntil, withLatestFrom} from 'rxjs/operators';
import {combineEpics, ofType} from 'redux-observable';
import {Observable, of, timer} from 'rxjs';
import {ActionType, SnakeActions} from '../action';
import {Direction, GameType, Point, GameStatus} from '../../domain';
import {Specs} from '../../specs';
import {CoreActions} from '../core';

const BASIC_INTERVAL = Specs.snakeGame.baseCreepIntervalMs;

function nextCreepAction(appState: AppState) {
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
    return head.x < 1 || head.x >= Specs.screen.graphicWidth - 1 || head.y < 1 || head.y >= Specs.screen.graphicHeight - 1;
}

function calculateInterval(level: number): number {
    return BASIC_INTERVAL - level * 100;
}

const creepFunc = (creepActionFunc: (state: AppState) => AppAction) =>
    (action$: Observable<AppAction>, state$: Observable<AppState>) => {
        return action$.pipe(
            ofType(ActionType.ENTER_GAME, ActionType.SNAKE_NEXT_LEVEL),
            withLatestFrom(state$),
            map(([, s]) => s),
            filter(s => s.core.gameType === GameType.SNAKE),
            switchMap(state => {
                const interval = calculateInterval(state.core.getLevel());
                return timer(interval, interval).pipe(
                    takeUntil(action$.pipe(ofType(ActionType.EXIT_GAME, ActionType.SNAKE_ESCAPE))),
                    withLatestFrom(state$),
                    map(([, s]) => s),
                    filter(s => s.core.gameStatus === GameStatus.RUNNING),
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
        filter(a => (a.type === ActionType.SNAKE_CREEP && a.payload.grown) || a.type === ActionType.SNAKE_WIN),
        withLatestFrom(state$),
        map(([a, s]) => {
            const level = s.core.getLevel();
            const bodyLength = s.snake.body.size;
            const winBonus = a.type === ActionType.SNAKE_WIN ? 3 : 1;
            const score = SCORE_BASE * bodyLength + SCORE_BASE * level;
            return CoreActions.addScore(score * winBonus);
        }),
    );
};

const ESCAPE_INTERVAL = Specs.snakeGame.escapeAnimationIntervalMs;
const escapeEpic = (action$: Observable<AppAction>,
                    state$: Observable<AppState>) => {
    return action$.pipe(
        ofType(ActionType.SNAKE_ESCAPE),
        map(a => {
            if (a.type === ActionType.SNAKE_ESCAPE) {
                return a.payload;
            } else {
                throw new TypeError('Assertion error: impossible to reach here!');
            }
        }),
        delay(ESCAPE_INTERVAL),
        withLatestFrom(state$),
        map(([step, s]) => {
            return s.snake.body.size <= 0 ? SnakeActions.win() : SnakeActions.escape(step + 1);
        }),
    );
};

const winEpic = (action$: Observable<AppAction>,
                 state$: Observable<AppState>) => {
    return action$.pipe(
        ofType(ActionType.SNAKE_WIN),
        withLatestFrom(state$),
        map(([, s]) => s.core.getLevel()),
        concatMap(level =>
            level >= Specs.core.maxLevel ? of(CoreActions.exitGame()) : of(CoreActions.increaseLevel(), SnakeActions.nextLevel())
        )
    );
};

const exitEpic = (action$: Observable<AppAction>,
                  state$: Observable<AppState>) => {
    return action$.pipe(
        ofType(ActionType.SNAKE_HIT_WALL, ActionType.SNAKE_BITE_SELF),
        withLatestFrom(state$),
        filter(([, s]) => s.snake.life < 1),
        mapTo(CoreActions.exitGame())
    );
};

export const snakeEpic = {
    epic: combineEpics(creepEpic, scoreEpic, escapeEpic, winEpic, exitEpic),
    _creepFunc: creepFunc,
    _scoreEpic: scoreEpic,
    _escapeEpic: escapeEpic,
    _nextCreepAction: nextCreepAction,
    _winEpic: winEpic,
    _exitEpic: exitEpic,
    BASIC_INTERVAL,
    SCORE_BASE,
    ESCAPE_INTERVAL
};
