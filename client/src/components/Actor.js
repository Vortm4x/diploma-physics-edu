import { fabric } from 'fabric'
import SceneObject from './SceneObject.js'
import Vector from './Vector.js'

export default class Actor extends SceneObject {
  constructor (spriteId, borderInset) {
    super()

    const scale = 0.25

    this.fabricObject = new fabric.Image(
      spriteId,
      {
        lockScalingX: true,
        lockScalingY: true,
        scaleX: scale,
        scaleY: scale,
        padding: -borderInset * scale,
        borderColor: 'red',
        cornerColor: 'green',
        cornerSize: 6,
        transparentCorners: false,
        originX: 'center',
        originY: 'center'
      }
    )

    this.fabricObject.setControlsVisibility({
      mt: false,
      mb: false,
      ml: false,
      mr: false,
      tl: false,
      tr: false,
      bl: false,
      br: false
    })

    this.setPos(new Vector(0, 0))
  }

  lockMovementX (status) {
    this.fabricObject.lockMovementX = status
  }

  lockMovementY (status) {
    this.fabricObject.lockMovementY = status
  }

  setAngle (angle) {
    this.fabricObject.angle = angle * 180 / Math.PI
  }

  getAngle () {
    return this.fabricObject.angle * Math.PI / 180
  }

  setX (x) {
    this.fabricObject.left = x
  }

  setY (y) {
    this.fabricObject.top = y
  }

  setPos (pos) {
    this.setX(pos.getX())
    this.setY(pos.getY())
  }

  getX () {
    return this.fabricObject.left
  }

  getY () {
    return this.fabricObject.top
  }

  getPos () {
    return new Vector(
      this.getX(),
      this.getY()
    )
  }

  getWidth () {
    return this.fabricObject.width * this.fabricObject.scaleX + 2 * this.fabricObject.padding
  }

  getHeight () {
    return this.fabricObject.height * this.fabricObject.scaleY + 2 * this.fabricObject.padding
  }
}
