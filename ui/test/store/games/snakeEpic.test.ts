import {Lens} from 'monocle-ts';
import {List} from 'immutable';
import {TestScheduler} from 'rxjs/testing';
import {
    AppState,
    CoreActions,
    DefaultSnakeGameState,
    DefaultCoreState,
    SnakeActions,
} from '../../../src/store';
import {Direction, Point} from '../../../src/domain';
import {snakeEpic} from '../../../src/store/games/snakeEpic';

const defaultState: AppState = {
    core: DefaultCoreState,
    snake: DefaultSnakeGameState,
};

const pauseGameLens = Lens.fromPath<AppState>()(['core', 'inGamePaused']);
const bodyLens = Lens.fromPath<AppState>()(['snake', 'body']);
const directionLens = Lens.fromPath<AppState>()(['snake', 'direction']);
const beanLens = Lens.fromPath<AppState>()(['snake', 'bean']);

const newTestScheduler = () => new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
});

describe('creep action', () => {
    describe('creep forward', () => {
        const stateSetDirection = directionLens.set(Direction.NORTH)(defaultState);
        const stateSetBody = bodyLens.set(List.of(Point(5, 5)))(stateSetDirection);
        it('move', () => {
            expect(snakeEpic._nextCreepAction(stateSetBody))
                .toEqual(SnakeActions.creep(Point(5, 4), false));
        });

        it('grow', () => {
            const stateSetBean = beanLens.set(Point(5, 4))(stateSetBody);
            expect(snakeEpic._nextCreepAction(stateSetBean))
                .toEqual(SnakeActions.creep(Point(5, 4), true));
        });
    });

    describe('lose', () => {
        it('hit northern wall', () => {
            const stateSetDirection = directionLens.set(Direction.NORTH)(defaultState);
            const stateSetBody = bodyLens.set(List.of(Point(5, 0)))(stateSetDirection);
            expect(snakeEpic._nextCreepAction(stateSetBody))
                .toEqual(SnakeActions.hitWall());
        });
        // todo: more walls

        it('bite self', () => {
            const stateSetDirection = directionLens.set(Direction.NORTH)(defaultState);
            const stateSetBody = bodyLens.set(List.of(Point(5, 5), Point(5, 6)))(stateSetDirection);
            expect(snakeEpic._nextCreepAction(stateSetBody))
                .toEqual(SnakeActions.biteSelf());
        });
    });
});

describe('creep epic', () => {
    const mockCallback = jest.fn();
    const epicFunc = snakeEpic._creepFunc(mockCallback);

    beforeEach(() => {
        mockCallback.mockClear();
    });

    it('start and stop', () => {
        newTestScheduler().run(({hot, cold}) => {
            const intervalMs = snakeEpic.BASIC_INTERVAL - defaultState.core.getLevel() * 100;
            const action$ = hot(`a ${intervalMs * 2}ms b`, {a: CoreActions.enterGame(), b: CoreActions.exitGame()});
            const state$ = cold('s', {s: defaultState});
            const epic = epicFunc(action$, state$);
            epic.subscribe();
            // expectObservable(epic)
            //     .toBe('a 899ms a', {a: mockAction}); // todo try to fix mergeMap?
        });
        expect(mockCallback.mock.calls.length).toBe(2);
    });

    it('no creep when game is paused', () => {
        const state = pauseGameLens.set(true)(defaultState);
        newTestScheduler().run(({hot, cold}) => {
            const action$ = hot('a 5s b', {a: CoreActions.enterGame(), b: CoreActions.exitGame()});
            const state$ = cold('s', {s: state});
            const epic = epicFunc(action$, state$);
            epic.subscribe();
        });
        expect(mockCallback.mock.calls.length).toBe(0);
    });

});

describe('score epic', () => {
    const mockPoint = Point(1, 2);
    const GROWN = SnakeActions.creep(mockPoint, true);
    const CREEP = SnakeActions.creep(mockPoint, false);
    const WIN = SnakeActions.win();
    const score = (defaultState.core.getLevel() + defaultState.snake.body.size) * snakeEpic.SCORE_BASE;

    it('grown creep will add score', () => {
        newTestScheduler().run(({cold, expectObservable}) => {
            const action$ = cold('cggcgw|', {g: GROWN, c: CREEP, w: WIN});
            const state$ = cold('s', {s: defaultState});
            const epic = snakeEpic._scoreEpic(action$, state$);
            expectObservable(epic).toBe('-aa-at|', {a: CoreActions.addScore(score), t: CoreActions.addScore(score * 3)});
        });
    });
});

describe('escape epic', () => {
    it('escape triggers an other escape if the body still exists', () => {
        newTestScheduler().run(({cold, expectObservable}) => {
            const action$ = cold('e|', {e: SnakeActions.escape(0)});
            const state$ = cold('s', {s: defaultState});
            const epic = snakeEpic._escapeEpic(action$, state$);
            expectObservable(epic).toBe(`${snakeEpic.ESCAPE_INTERVAL}ms e|`, {e: SnakeActions.escape(1)});
        });
    });
    it('escape triggers a win if all body has escaped', () => {
        const stateSetBody = bodyLens.set(List.of())(defaultState);
        newTestScheduler().run(({cold, expectObservable}) => {
            const action$ = cold('e|', {e: SnakeActions.escape(0)});
            const state$ = cold('s', {s: stateSetBody});
            const epic = snakeEpic._escapeEpic(action$, state$);
            expectObservable(epic).toBe(`${snakeEpic.ESCAPE_INTERVAL}ms e|`, {e: SnakeActions.win()});
        });
    });
});
