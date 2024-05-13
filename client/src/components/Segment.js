export default class Segment {
  constructor (a, b) {
    this.a = a
    this.b = b
  }

  getA () {
    return this.a
  }

  getB () {
    return this.b
  }

  hasPoint (c) {
    const ab = this.getA().add(this.getB()).dist()
    const ac = this.getA().add(c).dist()
    const bc = this.getB().add(c).dist()
    const error = 0.00001

    return (ab - (ac + bc) <= error)
  }

  vector () {
    return this.getA().sub(this.getB())
  }
}
