export default class Vector {
  public readonly x: number;
  public readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  get dist(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  rotate(fi: number): Vector {
    const cosA = Math.cos(fi);
    const sinA = Math.sin(fi);

    return new Vector(
      this.x * cosA - this.y * sinA,
      this.x * sinA + this.y * cosA
    );
  }

  add(other: Vector): Vector {
    return new Vector(this.x + other.x, this.y + other.y);
  }

  sub(other: Vector): Vector {
    return new Vector(this.x - other.x, this.y - other.y);
  }

  dot(other: Vector): number {
    return this.x * other.x + this.y * other.y;
  }

  angleTo(other: Vector): number {
    return Math.acos(this.dot(other) / (other.dist * this.dist));
  }
}
