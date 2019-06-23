const sfxCoreMenu = new Audio('audio/sfx_core_menu.mp3');
const sfxStart = new Audio('audio/sfx_start.mp3');
const sfxPauseIn = new Audio('audio/sfx_pause1_in.mp3');
const sfxPauseOut = new Audio('audio/sfx_pause1_out.mp3');

function play(audio: HTMLAudioElement) {
    audio.currentTime = 0;
    return audio.play();
}

export const SoundEffects = {
    playSfxCoreMenu: () => play(sfxCoreMenu),
    playSfxStart: () => play(sfxStart),
    playSfxPauseIn: () => play(sfxPauseIn),
    playSfxPauseOut: () => play(sfxPauseOut),
};
