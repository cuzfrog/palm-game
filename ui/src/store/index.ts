import {Action, applyMiddleware, combineReducers, createStore, Reducer, Store} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import {systemReducer} from './system/systemReducer';
import {SystemState} from './system/systemState';
import {snakeGameReducer} from './games/snake/snakeReducer';
import {SnakeGameState} from './games/snake/snakeState';
import {snakeSaga} from './games/snake/snakeSaga';

export interface AppState {
    readonly sys: SystemState;
    readonly snake: SnakeGameState;
}

const reducers: Reducer<AppState, Action> = combineReducers({
    sys: systemReducer,
    snake: snakeGameReducer
});

const sagaMiddleware = createSagaMiddleware();

export const store: Store<AppState> = createStore(
    reducers,
    /* initialState */
    composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(snakeSaga, store);
