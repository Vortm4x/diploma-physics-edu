<template>
  <div class="editing-workspace">
    <canvas id="editing-canvas"></canvas>
    <img id='laser-pointer' src='../assets/laser-pointer.png' style='display:none' />
    <img id='mirror' src='../assets/mirror.png' style='display:none' />
    <img id='sensor' src='../assets/sensor-fail.png' style='display:none' />
  </div>
</template>

<script>
// import { fabric } from 'fabric'
import Scene from './Scene.js'
import Body from './Body.js'
import Mirror from './Mirror.js'
import LaserPointer from './LaserPointer.js'
import Vector from './Vector.js'

export default {
  name: 'EditingWorkspace',

  mounted () {
    let scene = new Scene('editing-canvas', 800, 500)

    let laserPointer = new LaserPointer()
    let mirror = new Mirror('mirror', 35)
    let sensor = new Body('sensor', 33)

    laserPointer.setPos(new Vector(50, 250))
    laserPointer.lockMovementX(true)
    laserPointer.setAngle(-35)

    mirror.setPos(new Vector(200, 70))
    mirror.lockMovementY(true)
    mirror.setAngle(0)

    sensor.setPos(new Vector(600, 400))
    sensor.lockMovementX(true)
    sensor.lockMovementY(true)

    // const pathData = `
    //   M ${laserStart.getX()} ${laserStart.getY()}
    //   L ${mirror.getX()} ${mirror.getY()}
    //   Z
    // `

    // const pathData = `
    //   M ${mirror.getLeftBoundX()} ${mirror.getLeftBoundY()}
    //   L ${mirror.getRightBoundX()} ${mirror.getRightBoundY()}
    //   Z
    // `

    scene.addObject(laserPointer)
    scene.addObject(mirror)
    scene.addObject(sensor)

    let path = scene.getLaserPath(laserPointer)

    console.log(path)

    // const laser = new fabric.Path(pathData, {
    //   stroke: 'red',
    //   strokeWidth: 2,
    //   lockScalingX: true,
    //   lockScalingY: true,
    //   lockMovementX: true,
    //   lockMovementY: true,
    //   selectable: false,
    //   interactive: false,
    //   evented: false
    // })

    // laser.setControlsVisibility({
    //   mt: false,
    //   mb: false,
    //   ml: false,
    //   mr: false,
    //   tl: false,
    //   tr: false,
    //   bl: false,
    //   br: false,
    //   mtr: false
    // })

    // canvas.add(laser)
  }
}
</script>

<style scoped>
.editing-workspace {
  height: 100%;
  background-color: aqua;
}
</style>
