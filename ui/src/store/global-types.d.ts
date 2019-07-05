export {};

declare global {
    type CoreAction = import('./action/core-actions').CoreAction;
    type KeyboardAction = import('./action/keyboard-actions').KeyboardAction;
    type SnakeAction = import('./action/snake-actions').SnakeAction;
    type AppAction = CoreAction | SnakeAction | KeyboardAction;
    type CoreState = import('./core/core-state').CoreState;
    type SnakeGameState = import('./games/snake-state').SnakeGameState;
    interface AppState {
        readonly core: CoreState;
        readonly snake: SnakeGameState;
    }

    type Predicate<T> = (value: T) => boolean;
}
