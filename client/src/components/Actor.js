import { fabric } from 'fabric'

export default class Actor {
  constructor (spriteId, borderInset) {
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
        transparentCorners: false
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

    this.setX(0)
    this.setY(0)
  }

  addToScene (scene) {
    scene.add(this.fabricObject)
  }

  lockMovementX (status) {
    this.fabricObject.lockMovementX = status
  }

  lockMovementY (status) {
    this.fabricObject.lockMovementY = status
  }

  setAngle (angle) {
    this.fabricObject.angle = angle
  }

  getAngle () {
    return this.fabricObject.angle
  }

  setX (x) {
    this.fabricObject.left = x
  }

  setY (y) {
    this.fabricObject.top = y
  }

  getX () {
    return this.fabricObject.left
  }

  getY () {
    return this.fabricObject.top
  }

  getWidth () {
    return this.fabricObject.width * this.fabricObject.scaleX
  }

  getHeight () {
    return this.fabricObject.height * this.fabricObject.scaleY
  }

  getCenterX () {
    return this.fabricObject.left + this.getWidth() / 2
  }

  getCenterY () {
    return this.fabricObject.top + this.getHeight() / 2
  }
}
