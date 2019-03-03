import {Action, applyMiddleware, combineReducers, createStore, Reducer, Store} from 'redux';
import {combineEpics, createEpicMiddleware} from 'redux-observable';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import {coreReducer} from './core/coreReducer';
import {CoreState} from './core/coreState';
import {snakeGameReducer} from './games/snakeReducer';
import {SnakeGameState} from './games/snakeState';
import {snakeEpic} from './games/snakeEpic';

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
