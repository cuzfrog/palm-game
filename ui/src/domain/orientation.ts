export const enum Orientation {
  UP = 0, LEFT = -90, DOWN = 180, RIGHT = 90
}

export type RotationDegree = -90 | 90 | 180;

export function rotateOrientation(o: Orientation, degree: RotationDegree): Orientation {
  let next = o + degree;
  if (next > 180) {
    next = next - 360;
  } else if (next < -90) {
    next = next + 360;
  }
  return next;
}
