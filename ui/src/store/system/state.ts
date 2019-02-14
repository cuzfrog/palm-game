import {Map} from 'immutable';
import {KeyboardProps} from '../../console/keyboard/Keyboard';
import {MenuKeyboardLayout} from '../keyboardDef';

export enum SystemStatus { // todo: try to make it const
    MENU, IN_GAME
}

export const enum GameType {
    SNAKE,
}

export interface SystemState {
    readonly status: SystemStatus;
    readonly scores: Map<GameType, number>;
    readonly level: number;
    readonly gameType: GameType;
    readonly inGamePaused: boolean;
    readonly keyboardLayout: KeyboardProps;
}

export const DefaultSystemState: SystemState = {
    status: SystemStatus.MENU,
    scores: Map(),
    level: 1,
    gameType: GameType.SNAKE,
    inGamePaused: false,
    keyboardLayout: MenuKeyboardLayout,
};
