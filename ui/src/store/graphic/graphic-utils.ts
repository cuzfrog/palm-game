import { W, H, sW, sH } from "./graphic-types";

type Point = import("src/domain").Point;

/** From top to bottom coordination */
export function toIndex1(p: Point): number {
  return p.y * W + p.x;
}

const MaxY = H - 1;
/** Classic coordination */
export function toIndex2(p: Point): number {
  return p.x + (MaxY - p.y) * W;
}
export function xyToIndex2(x: number, y: number): number {
  return x + (MaxY - y) * W;
}

const MaxYs = sH - 1;
export function toIndex2s(p: Point): number {
  return p.x + (MaxYs - p.y) * sW;
}
