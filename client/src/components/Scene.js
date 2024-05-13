import { fabric } from 'fabric'
import Actor from './Actor.js'
import Body from './Body.js'
// import utils from './utils.js'
import Vector from './Vector.js'
import Segment from './Segment.js'
import Mirror from './Mirror.js'
import Ray from './Ray.js'

export default class Scene {
  constructor (sceneId, width, height) {
    this.canvas = new fabric.Canvas(
      sceneId,
      {
        width: width,
        height: height,
        backgroundColor: 'white',
        preserveObjectStacking: true
      }
    )

    this.actors = new Array(0)
  }

  getWidth () {
    return this.canvas.width
  }

  getHeight () {
    return this.canvas.height
  }

  addObject (object) {
    object.addToScene(this.canvas)

    if (object instanceof Actor) {
      this.actors.push(object)
    }
  }

  getNextLaserPath (ray) {
    const lt = new Vector(0, 0)
    const rt = new Vector(this.getWidth(), 0)
    const lb = new Vector(0, this.getHeight())
    const rb = new Vector(this.getWidth(), this.getHeight())

    let surfaceInfo = []

    surfaceInfo.push({ surface: new Segment(lt, rt), reflection: false })
    surfaceInfo.push({ surface: new Segment(rt, rb), reflection: false })
    surfaceInfo.push({ surface: new Segment(rb, lb), reflection: false })
    surfaceInfo.push({ surface: new Segment(lb, lt), reflection: false })

    for (let actor in this.actors) {
      if (actor instanceof Body) {
        surfaceInfo.push({
          surface: actor.getSurface(),
          reflection: (actor instanceof Mirror)
        })
      }
    }

    let minDist = Infinity
    let nearestInfo = null
    let nearestDest = null

    for (let info in surfaceInfo) {
      const dist = ray.dist(info.surface)
      const dest = ray.getEnd(dist)

      if (info.surface.hasPoint(dest)) {
        if (dist < minDist) {
          minDist = dist
          nearestInfo = info
          nearestDest = dest
        }
      }
    }

    let nextRayInfo = {
      begin: nearestDest,
      direction: null
    }

    if (nearestInfo.reflection) {
      const path = new Segment(
        ray.getBegin(),
        nearestDest
      )

      const reflectionAngle = path.vector().angle(
        nearestInfo.surface.vector()
      )

      nextRayInfo.direction = reflectionAngle + nearestInfo.surface.vector().angle(new Vector(1, 0))
    }

    return nextRayInfo
  }

  getLaserPath (laserPointer) {
    let path = []

    let rayInfo = {
      begin: laserPointer.getRay().getBegin(),
      direction: laserPointer.getRay().getDirection()
    }

    path.push(rayInfo.begin)

    while (rayInfo.direction != null) {
      rayInfo = this.getNextLaserPath(new Ray(
        rayInfo.begin,
        rayInfo.direction
      ))
      path.push(rayInfo.begin)
    }

    return path
  }
}
