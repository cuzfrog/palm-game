import {filter, tap} from "rxjs/operators";

export const SoundEffects = Object.freeze({
    sfxCoreMenu: new Audio("audio/sfx_core_menu.mp3"),
    sfxCoreSelect: new Audio("audio/sfx_core_menu_select.mp3"),
    sfxKeypress: new Audio("audio/sfx_core_keypress.mp3"),
    sfxEnterGame: new Audio("audio/sfx_core_enter_game.mp3"),
    sfxPauseIn: new Audio("audio/sfx_core_pause_in.mp3"),
    sfxPauseOut: new Audio("audio/sfx_core_pause_out.mp3"),
    sfxSnakeEatBean: new Audio("audio/sfx_snake_eat_bean.mp3"),
    sfxSnakeDamage: new Audio("audio/sfx_snake_damage.mp3"),
    sfxSnakeEscape: new Audio("audio/sfx_snake_escape.mp3"),
    sfxTetrisLockdown: new Audio("audio/sfx_tetris_lockdown2.mp3"),
    sfxTetrisLineclear: new Audio("audio/sfx_tetris_lineclear.mp3"),
});

type ActionType = import("../action").ActionType;
type SO = import("redux-observable").StateObservable<AppState>;
type O = import("rxjs").Observable<AppAction>;

export function createAudioEpic(audio: HTMLAudioElement,
                                actionFilter: Predicate<AppAction> | ReadonlyArray<ActionType>,
                                statePredicate: Predicate<AppState> = () => true) {
    const actionFilterOp = typeof actionFilter === "function" ?
        filter(actionFilter) : filter((a: AppAction) => actionFilter.includes(a.type));

    return (action$: O, state$: SO) => {
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
