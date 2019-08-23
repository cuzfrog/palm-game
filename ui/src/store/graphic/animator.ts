import { I, O, S, W } from "./graphic-types";
import { checkNonEmpty } from "src/utils";
import { Letters } from "./letters";

const FRAME_INTERVAL_MS = 300;
const SEPARATOR = "\n";

class BackgroundAnimator {
  private readonly backgroundSheet: ReadonlyArray<string>;
  private readonly sheetWidth: number;
  private readonly windowWidth: number;
  private colIdx: number = 0;
  private lastFrameTimestamp: number = Date.now();

  constructor(letters: ReadonlyArray<Letter>, windowWidth: number) {
    if (checkNonEmpty(letters).length === 0) {
      throw new Error("Background letters is empty!");
    }
    this.backgroundSheet = convertLettersToRows(letters, SEPARATOR)
      .map(line => line.replace(/[\s]/g, "O"));
    this.sheetWidth = this.backgroundSheet[0].length;
    if (windowWidth > this.sheetWidth) {
      throw new Error(`Windows width ${windowWidth} is greater than sheet width ${this.sheetWidth}`);
    }
    this.windowWidth = windowWidth;
  }

  public setBackgroundFrame(frameBuffer: Uint8Array, offset: number): void { // todo: optimize
    if (Date.now() - this.lastFrameTimestamp > FRAME_INTERVAL_MS) {
      const backgroundWindow = this.backgroundSheet.map(line => line.substr(this.colIdx, this.windowWidth)).join("");
      for (let i = 0; i < backgroundWindow.length; i++) {
        const p = backgroundWindow.charAt(i);
        const fi = i + offset;
        if (p === "O") {
          frameBuffer[fi] = O;
        } else if (p === "I") {
          frameBuffer[fi] = I;
        } else if (p === "S") {
          frameBuffer[fi] = S;
        }
      }
      this.shiftWindow();
    }
  }

  private shiftWindow() {
    if (this.colIdx + this.windowWidth >= this.sheetWidth) {
      this.colIdx = 0;
    } else {
      this.colIdx++;
    }
    this.lastFrameTimestamp = Date.now();
  }
}

function convertLettersToRows(letters: ReadonlyArray<Letter>, separator: string): ReadonlyArray<string> {
  return letters.map(letter => alignLetter(letter, separator).value.split(separator))
    .reduce((a, b) => a.map((l, i) => l + " " + b[i]));
}

function alignLetter(letter: Letter, separator: string): Letter {
  return {
    value: letter.value.split(separator)
      .map(line => line + " ".repeat(letter.width - line.length))
      .join(separator),
    width: letter.width
  };
}

export const BackgroundAnims = {
  snake: new BackgroundAnimator(Letters.SNAKE, W),
  tetris: new BackgroundAnimator(Letters.TETRIS, W),
  _convertLettersToRows: convertLettersToRows
};
