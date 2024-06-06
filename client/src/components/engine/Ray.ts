import Segment from "./Segment";
import Vector from "./Vector";

export default class Ray {
  public readonly source: Vector;
  public readonly direction: number;
  public readonly isRefracted: boolean;

  constructor(source: Vector, direction: number, isRefracted?: boolean) {
    this.source = source;
    this.direction = direction;

    if (isRefracted !== undefined) {
      this.isRefracted = isRefracted;
    } else {
      this.isRefracted = false;
    }
  }

  dist(segment: Segment) {
    const cosA = Math.cos(this.direction);
    const sinA = Math.sin(this.direction);

    const v0 = segment.vector;
    const vc = new Segment(segment.begin, this.source).vector;

    const d = (vc.x * v0.y - vc.y * v0.x) / (sinA * v0.x - cosA * v0.y);

    return d;
  }

  end(dist: number) {
    const cosA = Math.cos(this.direction);
    const sinA = Math.sin(this.direction);

    return this.source.add(new Vector(dist * cosA, dist * sinA));
  }
}
