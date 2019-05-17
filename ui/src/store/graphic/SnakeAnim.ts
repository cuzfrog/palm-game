import {Anim, AnimType, H, I, O, W} from './graphicTypes';
import {List, Range} from 'immutable';
import {Direction, Frame, PixelState, Point} from '../../domain';
import {toIndex, validateFrame} from './graphicUtils';

const FRAME_INTERVAL_MS = 200;

export class SnakeAnim implements Anim {
    private static readonly INITIAL_BODY = Range(2, 8).map(x => Point(x, H - 2)).toList();
    private readonly body: List<Point>;
    private readonly di: Direction;

    constructor(state?: List<Point>, direction?: Direction) {
        this.body = state === undefined ? SnakeAnim.INITIAL_BODY : state;
        this.di = direction === undefined ? Direction.EAST : direction;
    }

    public advance(): Anim {
        const h: Point = this.body.last();
        let nx = h.x;
        let ny = h.y;
        let nd = this.di;
        switch (this.di) {
            case Direction.EAST:
                if (h.x >= W - 2) {
                    ny = nextY(h);
                    nd = Direction.NORTH;
                } else {
                    nx = h.x + 1;
                }
                break;
            case Direction.NORTH:
                const y2 = h.y < H - 1 ? h.y + 2 : 0;
                if (this.body.contains(Point(h.x, y2))) {
                    if (h.x > (W / 2)) {
                        nx = h.x - 1;
                        nd = Direction.WEST;
                    } else {
                        nx = h.x + 1;
                        nd = Direction.EAST;
                    }
                } else {
                    ny = nextY(h);
                }
                break;
            case Direction.WEST:
                if (h.x > 1) {
                    nx = h.x - 1;
                } else {
                    ny = nextY(h);
                    nd = Direction.NORTH;
                }
                break;
        }
        const nb = this.body.toSeq().concat(Point(nx, ny)).takeLast(this.body.size).toList();
        return new SnakeAnim(nb, nd);
    }

    public currentFrame(frameBuffer: PixelState[]): Frame {
        for (let i = 0; i < frameBuffer.length; i++) {
            frameBuffer[i] = O;
        }
        this.body.forEach(p => {
            frameBuffer[toIndex(p)] = I;
        });
        const frame = List(frameBuffer);
        if (validateFrame(frame)) {
            throw Error(`Bad frame from snake game anim, current body: ${this.body}`);
        }
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

function nextY(h: Point): number {
    return h.y > 0 ? h.y - 1 : H - 1;
}
