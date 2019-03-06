import {Lens} from 'monocle-ts';
import {List} from 'immutable';
import {TestScheduler} from 'rxjs/testing';
import {
    AppState,
    CoreActions,
    DefaultSnakeGameState,
    DefaultSystemState,
    SnakeActions,
    snakeEpic
} from '../../../src/store';
import {Direction, Point} from '../../../src/domain';

const defaultState: AppState = {
    core: DefaultSystemState,
    snake: DefaultSnakeGameState,
};

const pauseGameLens = Lens.fromPath<AppState>()(['core', 'inGamePaused']);
const bodyLens = Lens.fromPath<AppState>()(['snake', 'body']);
const directionLens = Lens.fromPath<AppState>()(['snake', 'direction']);
const beanLens = Lens.fromPath<AppState>()(['snake', 'bean']);

const testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
});

describe('snake epic', () => {
    const mockCallback = jest.fn();

    it('start and stop', () => {

        testScheduler.run(({hot, cold}) => {
            const action$ = hot('a 2s b', {a: CoreActions.enterGame(), b: CoreActions.exitGame()});
            const state$ = cold('s', {s: defaultState});
            const epic = snakeEpic._creepFunc(mockCallback)(action$, state$);
            epic.subscribe();
            // expectObservable(epic)
            //     .toBe('a 899ms a', {a: mockAction});
        });
        expect(mockCallback.mock.calls.length).toBe(2);
    });

    mockCallback.mockClear();

    it('no creep when game is paused', () => {

        const state = pauseGameLens.set(true)(defaultState);
        testScheduler.run(({hot, cold}) => {
            const action$ = hot('a 5s b', {a: CoreActions.enterGame(), b: CoreActions.exitGame()});
            const state$ = cold('s', {s: state});
            const epic = snakeEpic._creepFunc(mockCallback)(action$, state$);
            epic.subscribe();
        });
        expect(mockCallback.mock.calls.length).toBe(0);
    });

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
