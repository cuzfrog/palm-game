const sfxCoreMenu = new Audio('audio/sfx_core_menu.mp3');

export const SoundEffects = {
    playSfxCoreMenu: () => {
        sfxCoreMenu.currentTime = 0;
        return sfxCoreMenu.play();
    },
};
