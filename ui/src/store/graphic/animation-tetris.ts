import { AnimType } from "./anim";

type Anim = import("./anim").Anim;

export class TetrisAnimation implements Anim {
  readonly type = AnimType.GAME_TETRIS;  
  readonly frameInterval: number;

  isCompleted(): boolean {
    return false;
  }
  advance(): Anim {
    throw new Error("Method not implemented.");
  }
  currentFrame(frameBuffer: Uint8Array): Frame {
    throw new Error("Method not implemented.");
  }
}
