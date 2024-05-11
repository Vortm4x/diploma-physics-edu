import Actor from './Actor.js'

export default class LaserPointer extends Actor {
  constructor () {
    super('laser-pointer', 0)
  }

  getLaserStartX () {
    const a = super.getAngle() * Math.PI / 180

    const x0 = super.getCenterX()
    const x = (super.getWidth() / 2) * Math.cos(a)

    return x0 + x
  }

  getLaserStartY () {
    const a = super.getAngle() * Math.PI / 180

    const y0 = super.getCenterY()
    const y = (super.getWidth() / 2) * Math.sin(a)

    return y0 + y
  }
}
