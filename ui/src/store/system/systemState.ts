import {Map} from 'immutable';
import {KeyboardProps} from '../../console/keyboard/Keyboard';
import {getKeyboard} from '../keyboardDef';

export const enum SystemStatus {
    MENU, IN_GAME
}

export enum GameType {
    SNAKE, BOXER
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
    level: 3,
    gameType: GameType.SNAKE,
    inGamePaused: false,
    keyboardLayout: getKeyboard(),
};
