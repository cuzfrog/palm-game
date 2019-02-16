import {cancel, delay, fork, put, select, take} from 'redux-saga/effects';
import {ActionTypes} from '../../actions';
import {SnakeActions} from './actions';
import {AppState} from '../../index';
import {GameType} from '../../system/state';

const BASIC_INTERVAL = 1000; // ms
const getState = (state: AppState) => state.sys;

function* creep() {
    while (true) {
        const state = yield select(getState);
        yield delay(calculateInterval(state.level));
        if (state.gameType === GameType.SNAKE && !state.inGamePaused) {
            yield put(SnakeActions.creep());
        }
    }
}

function calculateInterval(level: number): number {
    return BASIC_INTERVAL - level * 100;
}

export function* creepSaga() {
    while (yield take(ActionTypes.ENTER_GAME)) {
        const creepTask = yield fork(creep);
        yield take(ActionTypes.EXIT_GAME);
        yield cancel(creepTask);
    }
}
