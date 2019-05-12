const constants = Object.seal({
    screen: {
        graphicWidth: 10,
        graphicHeight: 16,
    },
    core: {
        maxLevel: 8,
    },
    snakeGame: {
        beanProduceChance: 0.5,
        baseCreepIntervalMs: 900,
        winBodyLength: 7,
        baseScore: 5,
        escapeAnimationIntervalMs: 100,
    },
});

export const Specs: Readonly<typeof constants> = constants;
