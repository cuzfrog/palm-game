import {Anim, AnimType, BLANK_FRAME} from './graphic-types';
import {ConsoleStartAnimation} from './console-start-animation';
import {SnakeAnimation} from './snake-animation';

export {Graphic} from './graphic-engine';
export {Anim, AnimType} from './graphic-types';

const emptyAnim: Anim = {
    type: AnimType.DUMMY,
    frameInterval: 1000,
    isCompleted: () => true,
    advance: () => emptyAnim,
    currentFrame: () => BLANK_FRAME,
};

export const Animations = Object.seal({
    emptyAnim,
    consoleStartInitial: new ConsoleStartAnimation(),
    snakeInitial: new SnakeAnimation(),
    boxerInitial: emptyAnim,
});
