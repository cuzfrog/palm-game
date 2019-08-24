const isProd = process.env.NODE_ENV === "production";

const screen = Object.freeze({
  graphicWidth: 10,
  graphicHeight: 16,
  scoreDigitMaxWidth: 7,
  countDigitMaxWidth: 4,
  smallMatrixWidth: 4,
  smallMatrixHeight: 2,
});

const core = Object.freeze({
  maxLevel: 8,
});

const snakeGame = Object.freeze({
  beanProduceChance: 0.5,
  baseCreepIntervalMs: 900,
  winBodyLength: isProd ? 15 : 7,
  baseScore: 5,
  escapeAnimationIntervalMs: 100,
});

const tetrisGame = Object.freeze({
  probability: {
    I: 10, L: 5, J: 5, T: 8, S: 5, Z: 5, O: 8
  },
  initialX: screen.graphicWidth / 2,
  initialY: screen.graphicHeight - 1,
  baseDescendIntervalMs: 1000,
  markClearPauseDurationMs: 400,
  baseScore: 5,
  winFloorCountPerLevel: isProd ? 200 : 3,
});

const constants = Object.freeze({ screen, core, snakeGame, tetrisGame });

export const Specs = constants;
