export default class Vector {
  constructor (x, y) {
    this.x = x
    this.y = y
  }

  getX () {
    return this.x
  }

  getY () {
    return this.y
  }

  dist () {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  rot (a) {
    const cosA = Math.cos(a)
    const sinA = Math.sin(a)

    return new Vector(
      this.x * cosA - this.y * sinA,
      this.x * sinA + this.y * cosA
    )
  }

  add (other) {
    return new Vector(
      this.x + other.x,
      this.y + other.y
    )
  }

  sub (other) {
    return new Vector(
      this.x - other.x,
      this.y - other.y
    )
  }

  dot (other) {
    return this.x * other.x + this.y * other.y
  }

  angle (other) {
    return Math.acos(
      this.dot(other) / (other.dist() * this.dist())
    )
  }
}
