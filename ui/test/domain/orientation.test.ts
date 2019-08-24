import { rotateOrientation, Orientation } from "src/domain";

describe("orientation rotate", () => {
  it("clockwise", () => {
    const right = rotateOrientation(Orientation.UP, 90);
    expect(right).toBe(Orientation.RIGHT);
    const down = rotateOrientation(right, 90);
    expect(down).toBe(Orientation.DOWN);
    const left = rotateOrientation(down, 90);
    expect(left).toBe(Orientation.LEFT);
    const up = rotateOrientation(left, 90);
    expect(up).toBe(Orientation.UP);
  });

  it("anti-clockwise", () => {
    const left = rotateOrientation(Orientation.UP, -90);
    expect(left).toBe(Orientation.LEFT);
    const down = rotateOrientation(left, -90);
    expect(down).toBe(Orientation.DOWN);
    const right = rotateOrientation(down, -90);
    expect(right).toBe(Orientation.RIGHT);
    const up = rotateOrientation(right, -90);
    expect(up).toBe(Orientation.UP);
  });
});
