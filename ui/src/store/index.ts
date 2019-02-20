import {Action, applyMiddleware, combineReducers, createStore, Reducer, Store} from 'redux';
import {combineEpics, createEpicMiddleware} from 'redux-observable';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import {systemReducer} from './system/systemReducer';
import {SystemState} from './system/systemState';
import {snakeGameReducer} from './games/snake/snakeReducer';
import {SnakeGameState} from './games/snake/snakeState';
import {snakeEpic} from './games/snake/snakeEpic';
import {CoreGameState} from './games/coreState';
import {coreGameReducer} from './games/coreReducer';

export interface AppState {
    readonly sys: SystemState;
    readonly core: CoreGameState;
    readonly snake: SnakeGameState;
}

const reducers: Reducer<AppState, Action> = combineReducers({
    sys: systemReducer,
    core: coreGameReducer,
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
