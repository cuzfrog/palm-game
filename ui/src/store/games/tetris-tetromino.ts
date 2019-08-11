import { List } from 'immutable';
import { Point } from 'src/domain';
import { Specs } from 'src/specs';
import { randomInt } from 'src/utils';

const I = List.of(Point(0, 0), Point(0, 1), Point(0, 2), Point(0, 3));
const L = List.of(Point(0, 0), Point(0, 1), Point(0, 2), Point(1, 0));
const J = List.of(Point(0, 0), Point(1, 0), Point(1, 1), Point(1, 2));
const T = List.of(Point(1, 0), Point(0, 1), Point(1, 1), Point(2, 1));
const S = List.of(Point(0, 0), Point(1, 0), Point(1, 1), Point(2, 1));
const Z = List.of(Point(0, 1), Point(1, 1), Point(1, 0), Point(2, 0));
const O = List.of(Point(0, 0), Point(0, 1), Point(1, 1), Point(1, 0));

const Tetrominoes = Object.freeze({ I, L, J, T, S, Z, O });

const probabilityEntries = Object.entries(Specs.tetrisGame.probability);
const PROBABILITY_TOP = Object.values(Specs.tetrisGame.probability).reduce((n1, n2) => n1 + n2);

function nextTetromino(): List<Point> {
  let n = randomInt(PROBABILITY_TOP);
  for (const [k, v] of probabilityEntries) {
    n -= v;
    if (n <= 0) {
      return Tetrominoes[k];
    }
  }
  throw Error('Assertion error: tetris PROBABILITY_TOP is invalid!');
}

type RotationDegree = '-90' | '90' | '180';
function rotate(degree: RotationDegree) {

}

export const Tetromino = Object.freeze({
  nextTetromino
});
