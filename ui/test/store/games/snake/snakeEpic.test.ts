import {Lens} from 'monocle-ts';
import {List} from 'immutable';
import {TestScheduler} from 'rxjs/testing';
import {snakeEpic} from '../../../../src/store/games/snake/snakeEpic';
import {AppState} from '../../../../src/store';
import {DefaultSystemState} from '../../../../src/store/system/systemState';
import {DefaultSnakeGameState} from '../../../../src/store/games/snake/snakeState';
import {Direction, Point} from '../../../../src/domain';
import {SnakeActions} from '../../../../src/store/games/snake/snakeActions';
import {SystemActions} from '../../../../src/store/system/systemActions';

const defaultState: AppState = {
    sys: DefaultSystemState,
    snake: DefaultSnakeGameState,
};

const pauseGameLens = Lens.fromPath<AppState>()(['sys', 'inGamePaused']);
const bodyLens = Lens.fromPath<AppState>()(['snake', 'body']);
const directionLens = Lens.fromPath<AppState>()(['snake', 'direction']);
const beanLens = Lens.fromPath<AppState>()(['snake', 'bean']);

const testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
});

describe('snake epic', () => {
    const mockAction = {type: 'mock action'};

    it('start and stop', () => {
        const mockCallback = jest.fn(() => mockAction);
        testScheduler.run(({hot, cold}) => {
            const action$ = hot('a 2s b', {a: SystemActions.enterGame(), b: SystemActions.exitGame()});
            const state$ = cold('s', {s: defaultState});
            const epic = snakeEpic._snakeEpicFunc(action$, state$, mockCallback);
            epic.subscribe();
            // expectObservable(epic)
            //     .toBe('a 899ms a', {a: mockAction});
        });
        expect(mockCallback.mock.calls.length).toBe(2);
    });

    it('no creep when game is paused', () => {
        const mockCallback = jest.fn(() => mockAction);
        const state = pauseGameLens.set(true)(defaultState);
        testScheduler.run(({hot, cold}) => {
            const action$ = hot('a 5s b', {a: SystemActions.enterGame(), b: SystemActions.exitGame()});
            const state$ = cold('s', {s: state});
            const epic = snakeEpic._snakeEpicFunc(action$, state$, mockCallback);
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
