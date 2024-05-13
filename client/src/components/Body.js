import Actor from './Actor.js'
import Segment from './Segment.js'
import Vector from './Vector.js'

import utils from './utils.js'

export default class Body extends Actor {
  getSurface () {
    const delta = new Vector(
      super.getWidth() / 2, 0
    ).rot(
      super.getAngle() * Math.PI / 180
    )

    return new Segment(
      super.getPos().sub(delta),
      super.getPos().add(delta)
    )
  }

  getBeginX () {
    const dx = super.getWidth() / 2
    const a = utils.radians(super.getAngle())

    const x = utils.rotX(-dx, 0, a)

    return super.getX() + x
  }

  getBeginY () {
    const dx = super.getWidth() / 2
    const a = utils.radians(super.getAngle())

    const y = utils.rotY(-dx, 0, a)

    return super.getY() + y
  }

  getEndX () {
    const dx = super.getWidth() / 2
    const a = utils.radians(super.getAngle())

    const x = utils.rotX(dx, 0, a)

    return super.getX() + x
  }

  getEndY () {
    const dx = super.getWidth() / 2
    const a = utils.radians(super.getAngle())

    const y = utils.rotY(dx, 0, a)

    return super.getY() + y
  }
}
