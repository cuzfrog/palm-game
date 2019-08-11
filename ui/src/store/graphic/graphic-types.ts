import {PixelState} from 'src/domain';
import {Range} from 'immutable';
import {Specs} from 'src/specs';

export const I = PixelState.ON;
export const O = PixelState.OFF;
export const S = PixelState.TWINKLE;
export const W = Specs.screen.graphicWidth;
export const H = Specs.screen.graphicHeight;
export const L = W * H;
export const BLANK_FRAME = Range(0, L).map(() => O).toList();
