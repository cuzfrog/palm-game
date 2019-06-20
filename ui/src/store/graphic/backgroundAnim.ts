import {PixelState} from '../../domain';
import {I, O, S, W} from './graphicTypes';
import {checkNonEmpty} from '../../utils';
import {Letter, Letters} from './letters';

const FRAME_INTERVAL_MS = 300;
const SEPARATOR = '\n';

class BackgroundAnimator {
    private readonly backgroundSheet: ReadonlyArray<string>;
    private readonly sheetWidth: number;
    private readonly windowWidth: number;
    private colIdx: number = 0;
    private lastFrameTimestamp: number = Date.now();

    constructor(letters: ReadonlyArray<Letter>, windowWidth: number) {
        if (checkNonEmpty(letters).length === 0) {
            throw new Error('Background letters is empty!');
        }
        const letterRows = convertLettersToRows(letters, SEPARATOR)
            .map(line => line.replace(/[\s]/g, 'O'));
        const padding = Array(9).fill('O'.repeat(letterRows[0].length));
        this.backgroundSheet = padding.concat(letterRows);
        this.sheetWidth = this.backgroundSheet[0].length;
        if (windowWidth > this.sheetWidth) {
            throw new Error(`Windows width ${windowWidth} is greater than sheet width ${this.sheetWidth}`);
        }
        this.windowWidth = windowWidth;
    }

    public setBackgroundFrame(frameBuffer: PixelState[]): void { // todo: optimize
        if (Date.now() - this.lastFrameTimestamp > FRAME_INTERVAL_MS) {
            const backgroundWindow = this.backgroundSheet.map(line => line.substr(this.colIdx, this.windowWidth)).join('');
            for (let i = 0; i < backgroundWindow.length; i++) {
                const p = backgroundWindow.charAt(i);
                if (p === 'O') {
                    frameBuffer[i] = O;
                } else if (p === 'I') {
                    frameBuffer[i] = I;
                } else if (p === 'S') {
                    frameBuffer[i] = S;
                } else {
                    throw new Error(`Bad character: '${p}' in window:\n ${backgroundWindow},
                     length=${backgroundWindow.length}; frameBuffer.length=${frameBuffer.length}`);
                }
            }
            this.shiftWindow();
        }
    }

    private shiftWindow() {
        if (this.colIdx + this.windowWidth > this.sheetWidth) {
            this.colIdx = 0;
        } else {
            this.colIdx++;
        }
    }
}

function convertLettersToRows(letters: ReadonlyArray<Letter>, separator: string): ReadonlyArray<string> {
    return letters.map(letter => alignLetter(letter, separator).value.split(separator))
        .reduce((a, b) => a.map((l, i) => l + ' ' + b[i]));
}

function alignLetter(letter: Letter, separator: string): Letter {
    return {
        value: letter.value.split(separator)
            .map(line => line + ' '.repeat(letter.width - line.length))
            .join(separator),
        width: letter.width
    };
}

export const BackgroundAnims = {
    welcome: new BackgroundAnimator(Letters.PRESS_START, W),
    _convertLettersToRows: convertLettersToRows
};
