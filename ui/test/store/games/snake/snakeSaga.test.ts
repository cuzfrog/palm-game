import {testSaga} from 'redux-saga-test-plan';
import {createMockTask} from 'redux-saga/utils';
import {snakeSaga, snakeSagaTest} from '../../../../src/store/games/snake/snakeSaga';
import {ActionTypes} from '../../../../src/store/actions';
import {AppState} from '../../../../src/store';
import {DefaultSystemState} from '../../../../src/store/system/systemState';
import {DefaultSnakeGameState} from '../../../../src/store/games/snake/snakeState';

const state: AppState = {
    sys: DefaultSystemState,
    snake: DefaultSnakeGameState,
};

describe('snake saga', () => {
    it('start and stop loop', () => {
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
