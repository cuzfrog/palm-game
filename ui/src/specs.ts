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
  tetrisGame: {
    probability: {
      I: 10, L: 5, J: 5, T: 8, S: 5, Z: 5, O: 8
    },
    initialX: this.screen.availWidth / 2,
    initialY: this.screen.availWidth - 1,
  }
});

export const Specs = constants;
