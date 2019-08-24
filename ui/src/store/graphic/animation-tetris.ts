import { List } from "immutable";
import { Orientation } from "src/domain";
import { Specs } from "src/specs";
import { Tetromino } from "../games";
import { TetrominoType } from "../games/tetris-tetromino";
import { AnimType } from "./anim";
import { BackgroundAnims } from "./animator";
import { H, I, O, W } from "./graphic-types";
import { toIndex2 } from "./graphic-utils";

type Anim = import("./anim").Anim;
type Layout = { t: TetrominoType, o: Orientation, x: number, y: number };

const WORDS_OFFSET = (H / 2 + 1) * W;
const X = Specs.tetrisGame.initialX;
const Y = Specs.tetrisGame.initialY;
const TetrominoLayouts: ReadonlyArray<Layout> = Object.freeze([
  { t: "I", o: Orientation.RIGHT, x: X - 4, y: Y - 2 },
  { t: "L", o: Orientation.UP, x: X - 4, y: Y - 7 },
  { t: "T", o: Orientation.RIGHT, x: X + 2, y: Y - 7 },
  { t: "S", o: Orientation.RIGHT, x: X - 1, y: Y - 7 },
  { t: "O", o: Orientation.UP, x: X + 2, y: Y - 3 },
]);

class TetrisAnimation implements Anim {
  private rendered: boolean = false;
  isCompleted(): boolean {
    return false;
  }
  advance(): Anim {
    return new TetrisAnimation();
  }
  currentFrame(frameBuffer: Uint8Array): Frame {
    if (!this.rendered) {
      frameBuffer.fill(O);
      TetrominoLayouts.map(l => Tetromino.new(l.t, l.o, l.x, l.y)).forEach(t => {
        t.render().forEach(p => frameBuffer[toIndex2(p)] = I);
      });
      this.rendered = true;
    }
    BackgroundAnims.tetris.setBackgroundFrame(frameBuffer, WORDS_OFFSET);
    return List(frameBuffer);
  }

  get type() {
    return AnimType.GAME_TETRIS;
  }
  get frameInterval() {
    return 400;
  }
}

export const InitialTetrisAnimation: Anim = new TetrisAnimation();
