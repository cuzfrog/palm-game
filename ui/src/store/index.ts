import {Action, applyMiddleware, combineReducers, createStore, Reducer, Store} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import {systemReducer} from './system/reducer';
import {SystemState} from './system/state';
import {snakeGameReducer} from './games/snake/reducer';
import {SnakeGameState} from './games/snake/state';
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

sagaMiddleware.run(snakeSaga);
