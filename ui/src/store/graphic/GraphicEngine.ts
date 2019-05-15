import {List, Range} from 'immutable';
import {AppState, SnakeGameState} from '..';
import {Direction, Frame, GameType, PixelState, Point, SystemStatus} from '../../domain';
import {Specs} from '../../Specs';
import {Anim, AnimType} from './animTypes';

const I = PixelState.ON;
const O = PixelState.OFF;
const S = PixelState.TWINKLE;
const W = Specs.screen.graphicWidth;
const H = Specs.screen.graphicHeight;
const L = W * H;
const BLANK_FRAME = Range(0, L).map(() => O).toList();

const frameBuffer: PixelState[] = Array(L);

function show(state: AppState): Frame {
    let frame: Frame = BLANK_FRAME;
    switch (state.core.status) {
        case SystemStatus.MENU:
            frame = state.core.anim.currentFrame();
            break;
        case SystemStatus.IN_GAME:
            switch (state.core.gameType) {
                case GameType.SNAKE:
                    frame = snakeGameFrame(state.snake);
                    break;
                default:
                    throw new TypeError('Unknown gameType:' + state.core.gameType);
            }
            if (state.core.inGamePaused) {
                frame = pauseIndication(frame);
            }
    }
    return frame;
}

function validateFrame(frame: Frame): boolean {
    return L !== frame.size;
}

const borderFrame = Range(0, L).map(i => {
    if (i <= W || i % W === 0 || (i + 1) % W === 0 || i > L - W) {
        return I;
    } else {
        return O;
    }
}).toList();

function snakeGameFrame(state: SnakeGameState): Frame {
    borderFrame.forEach((v, i) => frameBuffer[i] = v);
    state.body.forEach(p => {
        frameBuffer[toIndex(p)] = I;
    });
    if (state.bean) {
        frameBuffer[toIndex(state.bean)] = S;
    }
    if (state.hole) {
        frameBuffer[toIndex(state.hole)] = O;
    }
    const frame = List(frameBuffer);
    if (validateFrame(frame)) {
        throw Error(`Bad frame, current state: ${state}`);
    }
    return frame;
}

function toIndex(p: Point): number {
    return p.y * W + p.x;
}

function pauseIndication(frame: Frame): Frame {
    return frame.map(s => s === I ? S : O);
}

export const Graphic = {
    show: (state: AppState) => show(state)
};

// -------------- Animations ---------------

const emptyAnim: Anim = {
    type: AnimType.DUMMY,
    frameInterval: 1000,
    isCompleted: () => true,
    advance: () => emptyAnim,
    currentFrame: () => BLANK_FRAME,
};

class ConsoleStartAnim implements Anim {
    private readonly rowCnt: number;

    constructor(state: number) {
        this.rowCnt = state;
    }

    public isCompleted(): boolean {
        return this.rowCnt > Specs.screen.graphicHeight + 3;
    }

    public advance(): Anim {
        let next: Anim;
        if (this.isCompleted()) {
            next = this;
        } else {
            next = new ConsoleStartAnim(this.rowCnt + 1);
        }
        return next;
    }

    public currentFrame(): Frame {
        for (let i = L - 1, j = W * this.rowCnt; i >= 0; i--, j--) {
            frameBuffer[i] = j > 0 ? I : O;
        }
        const frame = List(frameBuffer);
        if (validateFrame(frame)) {
            throw Error(`Bad frame from console start anim, current step: ${this.rowCnt}`);
        }
        return frame;
    }

    get frameInterval(): number {
        return 200;
    }

    get type(): AnimType {
        return AnimType.CONSOLE_START;
    }
}

class SnakeAnim implements Anim {
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
                    ny = h.y > 0 ? h.y - 1 : H;
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
                    ny = h.y > 0 ? h.y - 1 : H;
                }
                break;
            case Direction.WEST:
                if (h.x > 1) {
                    nx = h.x - 1;
                } else {
                    ny = h.y > 0 ? h.y - 1 : H;
                    nd = Direction.NORTH;
                }
                break;
        }
        const nb = this.body.toSeq().concat(Point(nx, ny)).takeLast(this.body.size).toList();
        return new SnakeAnim(nb, nd);
    }

    public currentFrame(): Frame {
        for (let i = 0; i < frameBuffer.length; i++) {
            frameBuffer[i] = O;
        }
        this.body.forEach(p => {
            frameBuffer[toIndex(p)] = I;
        });
        return List(frameBuffer);
    }

    public isCompleted(): boolean {
        return false;
    }

    get frameInterval(): number {
        return 700;
    }

    get type(): AnimType {
        return AnimType.GAME_SNAKE;
    }
}

export const Animations = Object.seal({
    emptyAnim,
    consoleStartInitial: new ConsoleStartAnim(0),
    snakeInitial: new SnakeAnim(),
    boxerInitial: emptyAnim,
});
