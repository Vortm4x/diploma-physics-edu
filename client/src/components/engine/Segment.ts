import Vector from "./Vector";

export default class Segment {
  public readonly begin: Vector;
  public readonly end: Vector;

  constructor(begin: Vector, end: Vector) {
    this.begin = begin;
    this.end = end;
  }

  hasPoint(c: Vector): boolean {
    const ab = this.begin.add(this.end).dist;
    const ac = this.begin.add(c).dist;
    const bc = this.end.add(c).dist;
    const error = 0.00001;

    return ab - (ac + bc) <= error;
  }

  get dist(): number {
    return this.vector.dist;
  }

  get vector(): Vector {
    return this.end.sub(this.begin);
  }
}
