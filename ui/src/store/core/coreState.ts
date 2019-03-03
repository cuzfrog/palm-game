import {Map} from 'immutable';
import {KeyboardProps} from '../../console/keyboard/Keyboard';
import {getKeyboard} from '../keyboardDef';
import {Life} from '../../domain';

export const enum SystemStatus {
    MENU, IN_GAME
}

export enum GameType {
    SNAKE, BOXER
}

export interface CoreState {
    readonly status: SystemStatus;
    readonly scores: Map<GameType, number>;
    readonly level: number;
    readonly life: Life;
    readonly enemyLife: Life;
    readonly gameType: GameType;
    readonly inGamePaused: boolean;
    readonly keyboardLayout: KeyboardProps;
}

const MINIMAL_LIFE = {
    hp: 0,
    maxHp: 1,
};

export const DefaultSystemState: CoreState = {
    status: SystemStatus.MENU,
    scores: Map(),
    level: 3,
    life: MINIMAL_LIFE,
    enemyLife: MINIMAL_LIFE,
    gameType: GameType.SNAKE,
    inGamePaused: false,
    keyboardLayout: getKeyboard(),
};
