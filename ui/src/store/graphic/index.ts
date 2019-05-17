import {Anim, AnimType, BLANK_FRAME} from './graphicTypes';
import {ConsoleStartAnim} from './ConsoleStartAnim';
import {SnakeAnim} from './SnakeAnim';

export {Graphic} from './graphicEngine';
export {Anim, AnimType} from './graphicTypes';

const emptyAnim: Anim = {
    type: AnimType.DUMMY,
    frameInterval: 1000,
    isCompleted: () => true,
    advance: () => emptyAnim,
    currentFrame: () => BLANK_FRAME,
};

export const Animations = Object.seal({
    emptyAnim,
    consoleStartInitial: new ConsoleStartAnim(),
    snakeInitial: new SnakeAnim(),
    boxerInitial: emptyAnim,
});
