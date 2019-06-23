const sfxCoreMenu = new Audio('audio/sfx_core_menu.mp3');
const sfxEnterGame = new Audio('audio/sfx_enter_game.mp3');
const sfxPauseIn = new Audio('audio/sfx_pause1_in.mp3');
const sfxPauseOut = new Audio('audio/sfx_pause1_out.mp3');

const sfxSnakeEatBean = new Audio('audio/sfx_snake_eat_bean.mp3');
const sfxSnakeDamage = new Audio('audio/sfx_snake_damage.mp3');

function play(audio: HTMLAudioElement) {
    audio.currentTime = 0;
    return audio.play();
}

export const SoundEffects = {
    playSfxCoreMenu: () => play(sfxCoreMenu),
    playSfxStart: () => play(sfxEnterGame),
    playSfxPauseIn: () => play(sfxPauseIn),
    playSfxPauseOut: () => play(sfxPauseOut),
    playSfxSnakeEatBean: () => play(sfxSnakeEatBean),
    playSfxSnakeDamage: () => play(sfxSnakeDamage),
};
