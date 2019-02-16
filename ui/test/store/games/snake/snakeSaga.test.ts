import {take} from 'redux-saga/effects';
import {snakeSaga} from '../../../../src/store/games/snake/snakeSaga';
import {ActionTypes} from '../../../../src/store/actions';
import {store} from '../../../../src/store';

describe('snake saga', () => {
    it('start and stop', () => {
        const gen = snakeSaga(store);
        expect(gen.next().value).toEqual(take(ActionTypes.ENTER_GAME));
    });
});
