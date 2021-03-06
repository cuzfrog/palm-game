export const enum SystemStatus {
  STARTING = "STARTING", MENU = "MENU", IN_GAME = "IN_GAME"
}

export const enum GameStatus {
  STOPPED = "stopped", RUNNING = "running", PAUSED = "paused", TO_QUIT = "to_quit"
}

export enum GameType {
  SNAKE = "snake", TETRIS = "tetris"
}

export const enum PixelState {
  OFF, ON, TWINKLE, BLINK
}
