import { I, O } from "./graphic-types";
import { List } from "immutable";
import { AnimType } from "./anim";

type Anim = import("./anim").Anim;

class ConsoleStartAnimation implements Anim {
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
            next = new ConsoleStartAnimation(this.step + 1);
        }
        return next;
    }

    public currentFrame(frameBuffer: Uint8Array): Frame {
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
                throw new Error("Asssertion error: no such step");
        }
    }

    get type(): AnimType {
        return AnimType.CONSOLE_START;
    }
}

export const InitialConsoleStartAnimation: Anim = new ConsoleStartAnimation();
