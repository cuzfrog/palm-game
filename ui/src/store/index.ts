import {Action, applyMiddleware, createStore, Store} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import {systemReducer} from './system/reducer';
import {DefaultSystemState, SystemState} from './system/state';
import {snakeGameReducer} from './games/snake/reducer';
import {DefaultSnakeGameState, SnakeGameState} from './games/snake/state';
import {creepSaga} from './games/snake/creepSaga';

export interface AppState {
    readonly sys: SystemState;
    readonly snake: SnakeGameState;
}

function combined(state: AppState, action: Action): AppState {
    return {
        sys: systemReducer(state.sys, action),
        snake: snakeGameReducer(state.snake, action),
    };
}

export const InitialState: AppState = {
    sys: DefaultSystemState,
    snake: DefaultSnakeGameState,
};

const sagaMiddleware = createSagaMiddleware();

export const store: Store<AppState> = createStore(
    combined,
    InitialState,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(creepSaga);
