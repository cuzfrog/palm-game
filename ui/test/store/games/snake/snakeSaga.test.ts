import {testSaga} from 'redux-saga-test-plan';
import {createMockTask} from '@redux-saga/testing-utils';
import {Lens} from 'monocle-ts';
import {snakeSaga, snakeSagaTest} from '../../../../src/store/games/snake/snakeSaga';
import {ActionTypes} from '../../../../src/store/actions';
import {AppState} from '../../../../src/store';
import {DefaultSystemState} from '../../../../src/store/system/systemState';
import {DefaultSnakeGameState} from '../../../../src/store/games/snake/snakeState';
import {Direction} from '../../../../src/store/types';
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

const pauseGameLens = Lens.fromPath<AppState>()(['sys', 'inGamePaused']);
const directionLens = Lens.fromPath<AppState>()(['snake', 'direction']);
const bodyLens = Lens.fromPath<AppState>()(['snake', 'body']);

describe('creep saga', () => {
    it('no creep is game is paused', () => {
        const state = pauseGameLens.set(true)(defaultState);
        const delayInterval = 3;
        testSaga(snakeSagaTest._creep, delayInterval).next()
            .delay(delayInterval).next()
            .select().next(state)
            .delay(delayInterval).next()
            .select().next(state)
            .finish()
            .isDone();
    });

    it('creep forward', () => {
        const state = bodyLens.set(List.of({x: 5, y: 5}))(directionLens.set(Direction.NORTH)(defaultState));
        const delayInterval = 1;
        testSaga(snakeSagaTest._creep, delayInterval).next()
            .delay(delayInterval).next()
            .select().next(state)
            .put(SnakeActions.creep({x: 5, y: 4}, false)).next()
            .delay(delayInterval)
            .finish()
            .isDone();
    });

    it('grow', () => {

    });

    it('hit wall', () => {

    });

    it('bite self', () => {

    });
});
