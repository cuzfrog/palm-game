import {Action, applyMiddleware, combineReducers, createStore, Reducer, Store} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {combineEpics, createEpicMiddleware} from 'redux-observable';
import {snakeEpic, snakeGameReducer, SnakeGameState} from './games';
import {coreReducer, CoreState} from './core';

export interface AppState {
    readonly core: CoreState;
    readonly snake: SnakeGameState;
}

const reducers: Reducer<AppState, Action> = combineReducers({
    core: coreReducer,
    snake: snakeGameReducer
});
const epics = combineEpics(snakeEpic.epic);
const epicMiddleware = createEpicMiddleware<Action, Action, AppState>();

export const store: Store<AppState> = createStore(
    reducers,
    /* initialState */
    composeWithDevTools(applyMiddleware(epicMiddleware))
);

epicMiddleware.run(epics);
