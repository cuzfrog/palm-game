import {combineReducers, createStore} from 'redux';
import {systemReducer} from './system/reducers';

const reducers = combineReducers({
    system: systemReducer,
});

export const store = createStore(reducers);

export type AppState = ReturnType<typeof reducers>;
