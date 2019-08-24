type CoreAction = import("./action/core-actions").CoreAction;
type KeyboardAction = import("./action/keyboard-actions").KeyboardAction;
type SnakeAction = import("./action/snake-actions").SnakeAction;
type TetrisAction = import("./action/tetris-actions").TetrisAction;
type AppAction = CoreAction | SnakeAction | TetrisAction | KeyboardAction;

type CoreState = import("./core/core-state").CoreState;
type SnakeGameState = import("./games/snake-state").SnakeGameState;
type TetrisGameState = import("./games/tetris-state").TetrisGameState;
interface AppState {
    readonly core: CoreState;
    readonly snake: SnakeGameState;
    readonly tetris: TetrisGameState;
}

type Predicate<T> = (value: T) => boolean;
