import Vector from "./Vector";

export default class Segment {
  public readonly begin: Vector;
  public readonly end: Vector;

  constructor(begin: Vector, end: Vector) {
    this.begin = begin;
    this.end = end;
  }

  hasPoint(c: Vector): boolean {
    const ac = new Segment(this.begin, c).dist;
    const bc = new Segment(c, this.end).dist;
    const ab = this.dist;
    const error = 0.00001;

    return ac + bc - ab <= error;
  }

  projection(c: Vector): Vector {
    const v0 = this.vector;
    const vc = new Segment(this.begin, c).vector;

    return v0.coef(v0.dot(vc) / v0.dot(v0)).add(this.begin);
  }

  get dist(): number {
    return this.vector.dist;
  }

  get vector(): Vector {
    return this.end.sub(this.begin);
  }
}
