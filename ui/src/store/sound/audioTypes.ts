import {Observable} from 'rxjs';
import {AppAction, AppState} from '../index';
import {StateObservable} from 'redux-observable';
import {filter, tap} from 'rxjs/operators';
import {ActionTypes} from '../action';

export const SoundEffects = {
    sfxCoreMenu: new Audio('audio/sfx_core_menu1.mp3'),
    sfxEnterGame: new Audio('audio/sfx_core_enter_game.mp3'),
    sfxPauseIn: new Audio('audio/sfx_core_pause_in.mp3'),
    sfxPauseOut: new Audio('audio/sfx_core_pause_out.mp3'),
    sfxSnakeEatBean: new Audio('audio/sfx_snake_eat_bean.mp3'),
    sfxSnakeDamage: new Audio('audio/sfx_snake_damage.mp3'),
    sfxSnakeEscape: new Audio('audio/sfx_snake_escape.mp3')
};

type Predicate<T> = (value: T) => boolean;

export function createAudioEpic(audio: HTMLAudioElement,
                                actionFilter: Predicate<AppAction> | ActionTypes[],
                                statePredicate: Predicate<AppState> = () => true) {
    const actionFilterOp = typeof actionFilter === 'function' ?
        filter(actionFilter) : filter((a: AppAction) => actionFilter.includes(a.type));

    return (action$: Observable<AppAction>, state$: StateObservable<AppState>) => {
        return action$.pipe(
            filter(() => state$.value.core.audioEnabled),
            actionFilterOp,
            filter(() => statePredicate(state$.value)),
            tap(() => playAudio(audio)),
            filter(() => false),
        );
    };
}

function playAudio(audio: HTMLAudioElement) {
    audio.currentTime = 0;
    return audio.play();
}
