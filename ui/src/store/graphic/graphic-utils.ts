import { W, H } from "./graphic-types";

type Point = import("src/domain").Point;

/** From top to bottom coordination */
export function toIndex1(p: Point): number {
  return p.y * W + p.x;
}

const maxY = H - 1;
/** Classic coordination */
export function toIndex2(p: Point): number {
  return p.x + (maxY - p.y) * W;
}
