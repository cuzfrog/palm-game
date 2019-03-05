import {Map} from 'immutable';
import {getKeyboard, KeyboardDef} from '../keyboardDef';
import {GameType, SystemStatus} from '../../domain';

export interface CoreState {
    readonly status: SystemStatus;
    readonly scores: Map<GameType, number>;
    readonly level: number;
    readonly gameType: GameType;
    readonly inGamePaused: boolean;
    readonly keyboardLayout: KeyboardDef;
}

export const DefaultSystemState: CoreState = {
    status: SystemStatus.MENU,
    scores: Map(),
    level: 3,
    gameType: GameType.SNAKE,
    inGamePaused: false,
    keyboardLayout: getKeyboard(),
};
