export default class Vector {
  static get OX(): Vector {
    return new Vector(1, 0);
  }

  static get OY(): Vector {
    return new Vector(0, 1);
  }

  public readonly x: number;
  public readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  get dist(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  get unit(): Vector {
    const dist = this.dist;

    return new Vector(this.x / dist, this.y / dist);
  }

  rotate(fi: number): Vector {
    const cosA = Math.cos(fi);
    const sinA = Math.sin(fi);

    return new Vector(
      this.x * cosA - this.y * sinA,
      this.x * sinA + this.y * cosA
    );
  }

  add(that: Vector): Vector {
    return new Vector(this.x + that.x, this.y + that.y);
  }

  sub(that: Vector): Vector {
    return new Vector(this.x - that.x, this.y - that.y);
  }

  coef(c: number): Vector {
    return new Vector(this.x * c, this.y * c);
  }

  dot(that: Vector): number {
    return this.x * that.x + this.y * that.y;
  }

  cross(that: Vector): number {
    return this.x * that.y - this.y * that.x;
  }

  angleTo(that: Vector): number {
    return Math.PI - Math.atan2(this.cross(that), this.dot(that));
  }

  angleBetween(that: Vector): number {
    return Math.acos(this.dot(that) / (this.dist * that.dist));
  }
}
