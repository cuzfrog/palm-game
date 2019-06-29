import {Anim, AnimType, I, O} from './graphicTypes';
import {Frame, PixelState} from '../../domain';
import {List} from 'immutable';

export class ConsoleStartAnim implements Anim {
    private readonly step: number;

    constructor(step?: number) {
        this.step = step === undefined ? 1 : step;
    }

    public isCompleted(): boolean {
        return this.step >= 3;
    }

    public advance(): Anim {
        let next: Anim;
        if (this.isCompleted()) {
            next = this;
        } else {
            next = new ConsoleStartAnim(this.step + 1);
        }
        return next;
    }

    public currentFrame(frameBuffer: PixelState[]): Frame {
        switch (this.step) {
            case 1:
                frameBuffer.fill(O);
                break;
            case 2:
                frameBuffer.fill(I);
                break;
            case 3:
                frameBuffer.fill(O);
                break;
        }
        return List(frameBuffer);
    }

    get frameInterval(): number {
        switch (this.step) {
            case 1:
                return 200;
            case 2:
                return 1000;
            case 3:
                return 200;
            default:
                throw new Error('Asssertion error: no such step');
        }
    }

    get type(): AnimType {
        return AnimType.CONSOLE_START;
    }
}
