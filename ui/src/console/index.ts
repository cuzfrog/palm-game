import Console from './Console';
import {MATRIX_HEIGHT, MATRIX_WIDTH} from './screen/Matrix';

export default Console;

const specs = {
    graphicWidth: MATRIX_WIDTH,
    graphicHeight: MATRIX_HEIGHT
};

export const ConsoleSpecs: Readonly<typeof specs> = specs;
