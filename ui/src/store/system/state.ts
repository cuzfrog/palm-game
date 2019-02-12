import {GameType, SystemStatus} from '../types';
import {Map} from 'immutable';
import {KeyboardProps} from '../../console/keyboard/Keyboard';

export interface SystemState {
    readonly status: SystemStatus;
    readonly scores: Map<GameType, number>;
    readonly level: number;
    readonly gameType: GameType;
    readonly inGamePaused: boolean;
    readonly keyboardLayout: KeyboardProps;
}
