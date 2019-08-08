import { H, I, O, W } from './graphic-types';
import { List, Range } from 'immutable';
import { Direction, Point } from '../../domain';
import { toIndex } from './graphic-utils';
import { BackgroundAnims } from './animator';
import { AnimType } from './anim';

type Anim = import('./anim').Anim;

const FRAME_INTERVAL_MS = 200;
const INITIAL_BODY = Range(2, 8).map(x => Point(x, H / 2 - 2)).toList();
const WORDS_OFFSET = (H / 2 + 1) * W;
const BORDER_FRAME = Range(0, (H / 2 + 1) * W).map(i => {
    if (i <= W || i % W === 0 || (i + 1) % W === 0 || i > (H / 2) * W) {
        return I;
    } else {
        return O;
    }
}).toList();

export class SnakeAnimation implements Anim {
    private readonly body: List<Point>;
    private readonly di: Direction;
    private readonly lastTail?: Point;

    constructor(state?: List<Point>, direction?: Direction, lastTail?: Point) {
        this.body = state === undefined ? INITIAL_BODY : state;
        this.di = direction === undefined ? Direction.EAST : direction;
        this.lastTail = lastTail;
    }

    public advance(): Anim {
        const h: Point = this.body.last();
        let nx = h.x;
        let ny = h.y;
        let nd = this.di;
        switch (this.di) {
            case Direction.EAST:
                if (h.x >= W - 3) {
                    ny = h.y - 1;
                    nd = Direction.NORTH;
                } else {
                    nx = h.x + 1;
                }
                break;
            case Direction.NORTH:
                if (h.y === 2) {
                    nx = h.x - 1;
                    nd = Direction.WEST;
                } else {
                    ny = h.y - 1;
                }
                break;
            case Direction.WEST:
                if (h.x === 2) {
                    ny = h.y + 1;
                    nd = Direction.SOUTH;
                } else {
                    nx = h.x - 1;
                }
                break;
            case Direction.SOUTH:
                if (h.y >= (H / 2 - 2)) {
                    nx = h.x + 1;
                    nd = Direction.EAST;
                } else {
                    ny = h.y + 1;
                }
        }
        const nb = this.body.toSeq().concat(Point(nx, ny)).takeLast(this.body.size).toList();
        const lt = this.body.first(undefined);
        return new SnakeAnimation(nb, nd, lt);
    }

    public currentFrame(frameBuffer: Uint8Array): Frame {
        if (this.body === INITIAL_BODY) {
            BORDER_FRAME.forEach((v, i) => frameBuffer[i] = v);
        }
        BackgroundAnims.snake.setBackgroundFrame(frameBuffer, WORDS_OFFSET);

        this.body.forEach(p => {
            const i = toIndex(p);
            if (frameBuffer[i] === O) {
                frameBuffer[i] = I;
            }
        });
        if (this.lastTail !== undefined) {
            const i = toIndex(this.lastTail);
            if (frameBuffer[i] === I) {
                frameBuffer[i] = O;
            }
        }

        const frame = List(frameBuffer);
        return frame;
    }

    public isCompleted(): boolean {
        return false;
    }

    get frameInterval(): number {
        return FRAME_INTERVAL_MS;
    }

    get type(): AnimType {
        return AnimType.GAME_SNAKE;
    }
}
