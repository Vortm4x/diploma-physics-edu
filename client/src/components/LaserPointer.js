import Actor from './Actor.js'
import Ray from './Ray.js'
import Vector from './Vector.js'
import utils from './utils.js'

export default class LaserPointer extends Actor {
  constructor () {
    super('laser-pointer', 0)
  }

  getLaserSource () {
    return super.getPos().add(
      new Vector(super.getWidth() / 2, 0).rot(
        super.getAngle() * Math.PI / 180
      )
    )
  }

  getLaserStartX () {
    const a = utils.radians(super.getAngle())
    const x = utils.rotX(super.getWidth() / 2, 0, a)

    return x + super.getX()
  }

  getLaserStartY () {
    const a = utils.radians(super.getAngle())
    const y = utils.rotY(super.getWidth() / 2, 0, a)

    return y + super.getY()
  }

  getRay () {
    const direction = utils.radians(super.getAngle())
    const y = utils.rotY(super.getWidth() / 2, 0, direction)
    const x = utils.rotX(super.getWidth() / 2, 0, direction)

    return new Ray(
      new Vector(
        x + super.getX(),
        y + super.getY()
      ),
      direction
    )
  }
}
