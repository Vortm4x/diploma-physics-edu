import Segment from "./Segment";
import Vector from "./Vector";

export default class Ray {
  public readonly source: Vector;
  public readonly direction: number;

  constructor(source: Vector, direction: number) {
    this.source = source;
    this.direction = direction;
  }

  dist(segment: Segment) {
    const cosA = Math.cos(this.direction);
    const sinA = Math.sin(this.direction);

    const v0 = segment.vector;
    const vc = new Segment(this.source, segment.begin).vector;

    const d = (vc.x / v0.x - vc.y / v0.y) / (sinA / v0.y - cosA / v0.x);

    return d;
  }

  end(dist: number) {
    return this.source.add(
      new Vector(
        dist * Math.cos(this.direction),
        dist * Math.sin(this.direction)
      )
    );
  }
}
