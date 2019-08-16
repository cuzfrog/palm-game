import {combineEpics} from "redux-observable";
import {coreAudioEpic} from "./core-audio-epic";
import {snakeGameAudioEpic} from "./snake-game-audio-epic";

export const audioEpic = combineEpics(coreAudioEpic, snakeGameAudioEpic);
