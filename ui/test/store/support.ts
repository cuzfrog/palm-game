import { TestScheduler } from "rxjs/testing";
import { CoreState } from "src/store/core/core-state";
import { SnakeGameState } from "src/store/games/snake-state";
import { TetrisGameState } from "src/store/games/tetris-state";

export const newTestScheduler = () => new TestScheduler((actual, expected) => {
  expect(actual).toEqual(expected);
});

export const defaultState: AppState = {
  core: CoreState.Default,
  snake: SnakeGameState.Default,
  tetris: TetrisGameState.Default,
};
