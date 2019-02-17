import {Action, applyMiddleware, combineReducers, createStore, Reducer, Store} from 'redux';
import {combineEpics, createEpicMiddleware} from 'redux-observable';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import {systemReducer} from './system/systemReducer';
import {SystemState} from './system/systemState';
import {snakeGameReducer} from './games/snake/snakeReducer';
import {SnakeGameState} from './games/snake/snakeState';
import {snakeEpic} from './games/snake/snakeEpic';

export interface AppState {
    readonly sys: SystemState;
    readonly snake: SnakeGameState;
}

const reducers: Reducer<AppState, Action> = combineReducers({
    sys: systemReducer,
    snake: snakeGameReducer
});

const epics = combineEpics(snakeEpic);

const epicMiddleware = createEpicMiddleware<Action, Action, AppState>();

export const store: Store<AppState> = createStore(
    reducers,
    /* initialState */
    composeWithDevTools(applyMiddleware(epicMiddleware))
);

epicMiddleware.run(epics);
