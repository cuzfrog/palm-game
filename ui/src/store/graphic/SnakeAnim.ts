import {Anim, AnimType, H, I, O, S, W} from './graphicTypes';
import {List, Range} from 'immutable';
import {Direction, Frame, PixelState, Point} from '../../domain';
import {toIndex, validateFrame} from './graphicUtils';

const FRAME_INTERVAL_MS = 200;

const BACKGROUND = `
OOOOOOOOOO
OSSSOOOOOO
OSOSOOSSOO
OSSSSSSOOO
OSOSSOSSOO
OSOOSOSOOO
OOOOOOSSOO
OOOOOOOOOO
OOOOOOOOOO
OOOOOOOOOO
OOOOOOOOOO
OOOOOOOOOO
OOOOOOOOOO
OOOOOOOOOO
OOOOOOOOOO
OOOOOOOOOO
`.trim().replace(/[\r\n]/g, '');

function setBackgroundFrame(frameBuffer: PixelState[]): void { // todo: optimize
    for (let i = 0; i < frameBuffer.length; i++) {
        const p = BACKGROUND.charAt(i);
        if (p === 'O') {
            frameBuffer[i] = O;
        } else if (p === 'I') {
            frameBuffer[i] = I;
        } else if (p === 'S') {
            frameBuffer[i] = S;
        } else {
            throw new Error('Bad character:' + p);
        }
    }
}

export class SnakeAnim implements Anim {
    private static readonly INITIAL_BODY = Range(1, 9).map(x => Point(x, H - 1)).toList();
    private readonly body: List<Point>;
    private readonly di: Direction;
    private readonly lastTail?: Point;

    constructor(state?: List<Point>, direction?: Direction, lastTail?: Point) {
        this.body = state === undefined ? SnakeAnim.INITIAL_BODY : state;
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
                if (h.x >= W - 1) {
                    ny = h.y - 1;
                    nd = Direction.NORTH;
                } else {
                    nx = h.x + 1;
                }
                break;
            case Direction.NORTH:
                if (h.y === 0) {
                    nx = h.x - 1;
                    nd = Direction.WEST;
                } else {
                    ny = h.y - 1;
                }
                break;
            case Direction.WEST:
                if (h.x === 0) {
                    ny = h.y + 1;
                    nd = Direction.SOUTH;
                } else {
                    nx = h.x - 1;
                }
                break;
            case Direction.SOUTH:
                if (h.y >= H - 1) {
                    nx = h.x + 1;
                    nd = Direction.EAST;
                } else {
                    ny = h.y + 1;
                }
        }
        const nb = this.body.toSeq().concat(Point(nx, ny)).takeLast(this.body.size).toList();
        const lt = this.body.first(undefined);
        return new SnakeAnim(nb, nd, lt);
    }

    public currentFrame(frameBuffer: PixelState[]): Frame {
        if (this.body === SnakeAnim.INITIAL_BODY) {
            setBackgroundFrame(frameBuffer);
        }
        this.body.forEach(p => {
            frameBuffer[toIndex(p)] = I;
        });
        if (this.lastTail !== undefined) {
            frameBuffer[toIndex(this.lastTail)] = O;
        }

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
