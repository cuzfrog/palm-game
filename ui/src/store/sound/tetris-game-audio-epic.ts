import { combineEpics } from "redux-observable";
import { ActionType } from "../action";
import { createAudioEpic, SoundEffects } from "./audio-types";

const rotateKeypressAudioEpic = createAudioEpic(
  SoundEffects.sfxKeypress,
  [ActionType.TETRIS_ROTATE]
);

const lockDownAudioEpic = createAudioEpic(
  SoundEffects.sfxTetrisLockdown,
  [ActionType.TETRIS_LOCK_DOWN]
);

const lineClearAudioEpic = createAudioEpic(
  SoundEffects.sfxTetrisLineclear,
  [ActionType.TETRIS_LINE_CLEAR]
);

export const tetrisGameAudioEpic = combineEpics(rotateKeypressAudioEpic, lockDownAudioEpic, lineClearAudioEpic);
