import {Action, applyMiddleware, combineReducers, createStore, Reducer, Store} from 'redux';
import logger from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import {combineEpics, createEpicMiddleware} from 'redux-observable';
import {gameEpic, snakeGameReducer, SnakeGameState} from './games';
import {coreReducer, CoreState, coreEpic} from './core';
import {appReducer} from './appReducer';
import {audioEpic} from './sound';

export interface AppState {
    readonly core: CoreState;
    readonly snake: SnakeGameState;
}

const reducers: Reducer<AppState, Action> = (state, action) => {
    const combined = combineReducers({
        core: coreReducer,
        snake: snakeGameReducer
    });
    return appReducer(combined(state, action), action);
};

const epics = combineEpics(coreEpic, gameEpic, audioEpic);
const epicMiddleware = createEpicMiddleware<Action, Action, AppState>();

const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

export const store: Store<AppState> = createStore(
    reducers,
    undefined,
    composeEnhancers(applyMiddleware(epicMiddleware, logger))
);

epicMiddleware.run(epics);
