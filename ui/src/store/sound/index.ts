import {combineEpics} from "redux-observable";
import {coreAudioEpic} from "./core-audio-epic";
import {snakeGameAudioEpic} from "./snake-game-audio-epic";
import { tetrisGameAudioEpic } from "./tetris-game-audio-epic";

export const audioEpic = combineEpics(coreAudioEpic, snakeGameAudioEpic, tetrisGameAudioEpic);
