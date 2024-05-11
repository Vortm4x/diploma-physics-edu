<template>
  <div class="editing-workspace">
    <canvas id="editing-canvas"></canvas>
    <img id='laser-pointer' src='../assets/laser-pointer.png' style='display:none' />
    <img id='mirror' src='../assets/mirror.png' style='display:none' />
    <img id='sensor' src='../assets/sensor-fail.png' style='display:none' />
  </div>
</template>

<script>
import { fabric } from 'fabric'
import Actor from './Actor.js'
import LaserPointer from './LaserPointer.js'

export default {
  name: 'EditingWorkspace',

  mounted () {
    const canvas = new fabric.Canvas('editing-canvas',
      {
        width: 800,
        height: 500,
        backgroundColor: 'white',
        preserveObjectStacking: true
      }
    )

    let laserPointer = new LaserPointer()
    let mirror = new Actor(
      'mirror', 0
    )
    let sensor = new Actor(
      'sensor', 33
    )

    laserPointer.setX(60)
    laserPointer.setY(200)
    laserPointer.lockMovementX(true)
    laserPointer.setAngle(0)

    mirror.setX(200)
    mirror.setY(40)
    mirror.lockMovementY(true)

    sensor.setX(600)
    sensor.setY(300)
    sensor.lockMovementX(true)
    sensor.lockMovementY(true)

    const pathData = `
      M ${laserPointer.getLaserStartX()} ${laserPointer.getLaserStartY()} 
      L ${mirror.getX() + mirror.getWidth()} ${mirror.getY()} 
      Z
    `

    laserPointer.addToScene(canvas)
    mirror.addToScene(canvas)
    sensor.addToScene(canvas)

    const laser = new fabric.Path(pathData, {
      stroke: 'red',
      strokeWidth: 2,
      lockScalingX: true,
      lockScalingY: true,
      lockMovementX: true,
      lockMovementY: true,
      selectable: false,
      interactive: false,
      evented: false
    })

    laser.setControlsVisibility({
      mt: false,
      mb: false,
      ml: false,
      mr: false,
      tl: false,
      tr: false,
      bl: false,
      br: false,
      mtr: false
    })

    canvas.add(laser)
  }
}
</script>

<style scoped>
.editing-workspace {
  height: 100%;
  background-color: aqua;
}
</style>
