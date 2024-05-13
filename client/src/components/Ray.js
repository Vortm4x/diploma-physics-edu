import Segment from './Segment.js'
import Vector from './Vector.js'

export default class Ray {
  constructor (begin, direction) {
    this.begin = begin
    this.direction = direction
  }

  getBegin () {
    return this.begin
  }

  getDirection () {
    return this.direction
  }

  dist (segment) {
    const cosA = Math.cos(this.getDirection())
    const sinA = Math.sin(this.getDirection())

    const v0 = segment.vector()
    const vc = new Segment(this.getBegin(), segment.getA()).vector()

    const d = (vc.getX() / v0.getX() - vc.getY() / v0.getY()) / (sinA / v0.getY() - cosA / v0.getX())

    return d
  }

  getEnd (dist) {
    return this.getBegin().add(
      new Vector(
        dist * Math.cos(this.getDirection()),
        dist * Math.sin(this.getDirection())
      )
    )
  }
}
