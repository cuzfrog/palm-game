import {MATRIX_HEIGHT, MATRIX_WIDTH} from './console/screen/Matrix';

const specs = {
    graphicWidth: MATRIX_WIDTH,
    graphicHeight: MATRIX_HEIGHT,
    maxLevel: 8,
    snakeGame: {
        beanProduceChance: 0.5,
    },
};

export const Specs: Readonly<typeof specs> = specs;
