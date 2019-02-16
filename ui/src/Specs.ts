import {MATRIX_HEIGHT, MATRIX_WIDTH} from './console/screen/Matrix';

const specs = {
    graphicWidth: MATRIX_WIDTH,
    graphicHeight: MATRIX_HEIGHT,
    snakeGame: {
        beanProduceChance: 0.5,
    },
};

export const Specs: Readonly<typeof specs> = specs;
