import {testSaga} from 'redux-saga-test-plan';
import {createMockTask} from '@redux-saga/testing-utils';
import {Lens} from 'monocle-ts';
import {snakeSaga, snakeSagaTest} from '../../../../src/store/games/snake/snakeSaga';
import {ActionTypes} from '../../../../src/store/actions';
import {AppState} from '../../../../src/store';
import {DefaultSystemState} from '../../../../src/store/system/systemState';
import {DefaultSnakeGameState} from '../../../../src/store/games/snake/snakeState';
import {Direction, Point} from '../../../../src/store/types';
import {List} from 'immutable';
import {SnakeActions} from '../../../../src/store/games/snake/snakeActions';

const defaultState: AppState = {
    sys: DefaultSystemState,
    snake: DefaultSnakeGameState,
};

describe('snake saga', () => {
    it('start and stop loop', () => {
        const state = defaultState;
        const interval = snakeSagaTest._BASIC_INTERVAL - state.sys.level * 100;
        const mockTask = createMockTask();
        testSaga(snakeSaga).next()
            .take(ActionTypes.ENTER_GAME).next(true)
            .select().next(state)
            .fork(snakeSagaTest._creep, interval).next(mockTask)
            .take(ActionTypes.EXIT_GAME).next()
            .cancel(mockTask).next()
            .take(ActionTypes.ENTER_GAME);
    });
});

describe('creep saga', () => {
    const delayInterval = 3;
    it('no creep is game is paused', () => {
        const pauseGameLens = Lens.fromPath<AppState>()(['sys', 'inGamePaused']);
        const state = pauseGameLens.set(true)(defaultState);
        testSaga(snakeSagaTest._creep, delayInterval).next()
            .delay(delayInterval).next()
            .select().next(state)
            .delay(delayInterval).next()
            .select().next(state)
            .finish()
            .isDone();
    });

    const bodyLens = Lens.fromPath<AppState>()(['snake', 'body']);
    const directionLens = Lens.fromPath<AppState>()(['snake', 'direction']);

    describe('creep forward', () => {
        const stateSetDirection = directionLens.set(Direction.NORTH)(defaultState);
        const stateSetBody = bodyLens.set(List.of(Point(5, 5)))(stateSetDirection);
        it('move', () => {
            testSaga(snakeSagaTest._creep, delayInterval).next()
                .delay(delayInterval).next()
                .select().next(stateSetBody)
                .put(SnakeActions.creep(Point(5, 4), false)).next()
                .delay(delayInterval)
                .finish()
                .isDone();
        });

        it('grow', () => {
            const beanLens = Lens.fromPath<AppState>()(['snake', 'bean']);
            const stateSetBean = beanLens.set(Point(5, 4))(stateSetBody);
            testSaga(snakeSagaTest._creep, delayInterval).next()
                .delay(delayInterval).next()
                .select().next(stateSetBean)
                .put(SnakeActions.creep(Point(5, 4), true));
        });
    });

    describe('lose', () => {
        it('hit northern wall', () => {
            const stateSetDirection = directionLens.set(Direction.NORTH)(defaultState);
            const stateSetBody = bodyLens.set(List.of(Point(5, 0)))(stateSetDirection);
            testSaga(snakeSagaTest._creep, delayInterval).next()
                .delay(delayInterval).next()
                .select().next(stateSetBody)
                .put(SnakeActions.hitWall());
        });
        // todo: more walls

        it('bite self', () => {
            const stateSetDirection = directionLens.set(Direction.NORTH)(defaultState);
            const stateSetBody = bodyLens.set(List.of(Point(5, 5), Point(5, 6)))(stateSetDirection);
            testSaga(snakeSagaTest._creep, delayInterval).next()
                .delay(delayInterval).next()
                .select().next(stateSetBody)
                .put(SnakeActions.biteSelf());
        });
    });
});
