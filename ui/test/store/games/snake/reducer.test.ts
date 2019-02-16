import {List} from 'immutable';
import {snakeGameReducer} from '../../../../src/store/games/snake/reducer';
import {SnakeActions} from '../../../../src/store/games/snake/actions';
import {Direction} from '../../../../src/store/types';
import {SnakeGameState} from '../../../../src/store/games/snake/state';
import {Specs} from '../../../../src/Specs';

const prevState: SnakeGameState = {
    life: 3,
    body: List.of({x: 5, y: 5}, {x: 4, y: 5}),
    direction: Direction.NORTH,
};

const CHECK_TIMES = 1000;

it('creep forward', async () => {
    let beanCnt = 0;
    for (let i = 0; i < CHECK_TIMES; i++) {
        const state = snakeGameReducer(prevState, SnakeActions.creep({x: 3, y: 5}, false));
        expect(state.body).toEqual(List.of({x: 4, y: 5}, {x: 3, y: 5}));
        if (state.bean) {
            beanCnt++;
            const b = state.bean;
            expect(state.body).not.toContain(b);
            expect(b.x).toBeGreaterThanOrEqual(0);
            expect(b.x).toBeLessThan(Specs.graphicWidth);
            expect(b.y).toBeGreaterThanOrEqual(0);
            expect(b.y).toBeLessThan(Specs.graphicHeight);
        }
    }
    expect(beanCnt / CHECK_TIMES).toBeCloseTo(Specs.snakeGame.beanProduceChance, 1);
});

it('grow forward', async () => {
    for (let i = 0; i < CHECK_TIMES; i++) {
        const stateWithBean = {...prevState, bean: {x: 3, y: 5}};
        const state = snakeGameReducer(stateWithBean, SnakeActions.creep({x: 3, y: 5}, true));
        expect(state.body).toEqual(List.of({x: 5, y: 5}, {x: 4, y: 5}, {x: 3, y: 5}));
        expect(state.bean).toBeUndefined();
    }
});
