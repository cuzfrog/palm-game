import {List} from 'immutable';
import {SnakeActions, snakeGameReducer, SnakeGameState} from '../../../src/store';
import {Direction, Point} from '../../../src/domain';
import {Specs} from '../../../src/Specs';

const prevState: SnakeGameState = {
    body: List.of(Point(5, 5), Point(4, 5)),
    life : 3,
    direction: Direction.NORTH,
};

describe('snake reducer', () => {
    it('change direction', () => {
        const changeDirection = (di: Direction) => snakeGameReducer(prevState, SnakeActions.setDirection(di)).direction;
        expect(changeDirection(Direction.WEST)).toEqual(Direction.WEST);
        expect(changeDirection(Direction.SOUTH)).toEqual(prevState.direction);
        expect(changeDirection(Direction.EAST)).toEqual(Direction.EAST);
    });

    const CHECK_TIMES = 1000;

    it('creep forward', async () => {
        let beanCnt = 0;
        for (let i = 0; i < CHECK_TIMES; i++) {
            const state = snakeGameReducer(prevState, SnakeActions.creep(Point(3, 5), false));
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
            const stateWithBean = {...prevState, bean: Point(3, 5)};
            const state = snakeGameReducer(stateWithBean, SnakeActions.creep(Point(3, 5), true));
            expect(state.body).toEqual(List.of({x: 5, y: 5}, {x: 4, y: 5}, {x: 3, y: 5}));
            expect(state.bean).toBeUndefined();
        }
    });
});
