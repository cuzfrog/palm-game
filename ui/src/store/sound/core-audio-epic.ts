import {combineEpics} from "redux-observable";
import {ActionGroups, ActionType} from "../action";
import {createAudioEpic, SoundEffects} from "./audio-types";
import {SystemStatus, GameStatus} from "src/domain";

const menuAudioEpic = createAudioEpic(
    SoundEffects.sfxCoreMenu,
    [ActionType.INCREASE_LEVEL, ActionType.DECREASE_LEVEL],
    s => s.core.status === SystemStatus.MENU
);

const selectGameAudioEpic = createAudioEpic(
    SoundEffects.sfxCoreSelect,
    [ActionType.TOGGLE_GAME]
);

const enterGameAudioEpic = createAudioEpic(SoundEffects.sfxEnterGame, [ActionType.ENTER_GAME]);

const pauseInAudioEpic = createAudioEpic(
    SoundEffects.sfxPauseIn,
    [ActionType.TOGGLE_PAUSE],
    s => s.core.status === SystemStatus.IN_GAME && s.core.isPaused()
);

const pauseOutAudioEpic = createAudioEpic(
    SoundEffects.sfxPauseOut,
    [ActionType.TOGGLE_PAUSE],
    s => s.core.status === SystemStatus.IN_GAME && s.core.gameStatus === GameStatus.RUNNING
);

const inGameKeypressAudioEpic = createAudioEpic(
    SoundEffects.sfxKeypress,
    ActionGroups.directionKeys,
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
