export default class Vector {
  constructor (x, y) {
    this.x = x
    this.y = y
  }

  rotate (angle) {
    const a = angle * Math.PI / 180
    const sinA = Math.sin(a)
    const cosA = Math.cos(a)

    const x = this.x * cosA - this.y * sinA
    const y = this.x * sinA + this.y * cosA

    return new Vector(x, y)
  }

  x () {
    return this.x
  }

  y () {
    return this.y
  }

  len () {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }
}
