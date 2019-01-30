import {combineReducers, createStore} from 'redux';
import {systemReducer} from './system/reducer';

const reducers = combineReducers({
    sys: systemReducer,
});

export const store = createStore(reducers);

export type AppState = ReturnType<typeof reducers>;
