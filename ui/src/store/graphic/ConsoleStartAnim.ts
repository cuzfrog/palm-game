import {Anim, AnimType, I, L, O, W} from './graphicTypes';
import {Specs} from '../../Specs';
import {Frame, PixelState} from '../../domain';
import {List} from 'immutable';
import {validateFrame} from './graphicUtils';

const FRAME_INTERVAL_MS = 100;

export class ConsoleStartAnim implements Anim {
    private readonly rowCnt: number;

    constructor(rowCnt?: number) {
        this.rowCnt = rowCnt === undefined ? 0 : rowCnt;
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

    public currentFrame(frameBuffer: PixelState[]): Frame {
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
        return FRAME_INTERVAL_MS;
    }

    get type(): AnimType {
        return AnimType.CONSOLE_START;
    }
}
