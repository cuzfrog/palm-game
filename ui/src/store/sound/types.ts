const sfxCoreMenu = new Audio('audio/sfx_core_menu.mp3');
const sfxStart = new Audio('audio/sfx_start.mp3');

export const SoundEffects = {
    playSfxCoreMenu: () => {
        sfxCoreMenu.currentTime = 0;
        return sfxCoreMenu.play();
    },
    playSfxStart: () => {
        sfxStart.currentTime = 0;
        return sfxStart.play();
    },
};
