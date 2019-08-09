const isProd = process.env.NODE_ENV === 'production';

const constants = Object.freeze({
    screen: {
        graphicWidth: 10,
        graphicHeight: 16,
        scoreDigitMaxWidth: 8,
    },
    core: {
        maxLevel: 8,
    },
    snakeGame: {
        beanProduceChance: 0.5,
        baseCreepIntervalMs: 900,
        winBodyLength: isProd ? 15 : 7,
        baseScore: 5,
        escapeAnimationIntervalMs: 100,
    },
});

export const Specs = constants;
