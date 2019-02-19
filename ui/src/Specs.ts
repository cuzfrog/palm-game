import {MATRIX_HEIGHT, MATRIX_WIDTH} from './console/screen/Matrix';

const constants = Object.seal({
    graphicWidth: MATRIX_WIDTH,
    graphicHeight: MATRIX_HEIGHT,
    maxLevel: 8,
    snakeGame: {
        beanProduceChance: 0.5,
    },
});

export const Specs: Readonly<typeof constants> = constants;
