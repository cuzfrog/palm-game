import {combineEpics} from 'redux-observable';
import {ActionGroups, ActionTypes} from '../action';
import {createAudioEpic, SoundEffects} from './audioTypes';
import {SystemStatus} from '../../domain';

const menuAudioEpic = createAudioEpic(
    SoundEffects.sfxCoreMenu,
    [ActionTypes.INCREASE_LEVEL, ActionTypes.DECREASE_LEVEL],
    s => s.core.status === SystemStatus.MENU
);

const selectGameAudioEpic = createAudioEpic(
    SoundEffects.sfxCoreSelect,
    [ActionTypes.TOGGLE_GAME]
);

const enterGameAudioEpic = createAudioEpic(SoundEffects.sfxEnterGame, [ActionTypes.ENTER_GAME]);

const pauseInAudioEpic = createAudioEpic(
    SoundEffects.sfxPauseIn,
    [ActionTypes.TOGGLE_PAUSE],
    s => s.core.status === SystemStatus.IN_GAME && s.core.inGamePaused
);

const pauseOutAudioEpic = createAudioEpic(
    SoundEffects.sfxPauseOut,
    [ActionTypes.TOGGLE_PAUSE],
    s => s.core.status === SystemStatus.IN_GAME && !s.core.inGamePaused
);

const inGameKeypressAudioEpic = createAudioEpic(
    SoundEffects.sfxKeypress,
    ActionGroups.directionKeys.concat(ActionGroups.mainKeys),
    s => s.core.status === SystemStatus.IN_GAME
);

export const coreAudioEpic = combineEpics(
    menuAudioEpic,
    selectGameAudioEpic,
    enterGameAudioEpic,
    pauseInAudioEpic,
    pauseOutAudioEpic,
    inGameKeypressAudioEpic,
);
