import {List} from 'immutable';
import {snakeGameReducer} from '../../../../src/store/games/snake/reducer';
import {SnakeActions} from '../../../../src/store/games/snake/actions';
import {Direction} from '../../../../src/store/types';
import {SnakeGameState} from '../../../../src/store/games/snake/state';

const prevState: SnakeGameState = {
    life: 3,
    body: List.of({x: 5, y: 5}, {x: 4, y: 5}),
    direction: Direction.NORTH,
};

it('creep forward', () => {
    const state = snakeGameReducer(prevState, SnakeActions.creep({x: 3, y: 5}, false));
    expect(state.body).toEqual(List.of({x: 4, y: 5}, {x: 3, y: 5}));
});

it('grow forward', () => {
    const state = snakeGameReducer(prevState, SnakeActions.creep({x: 3, y: 5}, true));
    expect(state.body).toEqual(List.of({x: 5, y: 5}, {x: 4, y: 5}, {x: 3, y: 5}));
});
