import { fabric } from "fabric";
import SceneObject from "./SceneObject";
import LaserPointer from "./LaserPointer";
import Vector from "./Vector";
import Ray from "./Ray";
import Boundary from "./Boundary";
import Obstacle from "./Obstacle";
import ISurface from "./ISurface";
import IReflectableSurface from "./IReflectableSurface";
import IRefractableSurface from "./IRefractableSurface";
import { isSurface } from "./ISurface";
import { isReflectableSurface } from "./IReflectableSurface";
import { isRefractableSurface } from "./IRefractableSurface";
import LightSensor from "./LightSensor";

export default class Scene {
  protected canvas: fabric.Canvas;
  public readonly objects: SceneObject[];

  constructor(sceneId: string, width: number, height: number) {
    const fabricData = {
      width: width,
      height: height,
      backgroundColor: "white",
      preserveObjectStacking: true,
    };

    this.canvas = new fabric.Canvas(sceneId, fabricData);
    this.objects = [];
  }

  get width(): number {
    if (this.canvas.width === undefined) {
      return NaN;
    }

    return this.canvas.width;
  }

  get height(): number {
    if (this.canvas.height === undefined) {
      return NaN;
    }

    return this.canvas.height;
  }

  addObject(object: SceneObject): void {
    object.addToScene(this.canvas);

    this.objects.push(object);
  }

  removeObject(object: SceneObject): void {
    object.removeFromScene(this.canvas);

    const index = this.objects.indexOf(object);
    this.objects.splice(index, 1);
  }

  update(): void {
    for (const obj of this.objects) {
      if (obj instanceof LightSensor) {
        const sensor = obj as LightSensor;
        sensor.hasLight = false;
      }
    }

    for (const obj of this.objects) {
      if (obj instanceof LaserPointer) {
        const pointer = obj as LaserPointer;
        const rayPoints = [pointer.ray.source];

        let ray: Ray | null = pointer.ray;

        while (ray !== null) {
          const fallSurface = this.fallSurface(ray);

          if (fallSurface === null) {
            break;
          }

          const dist = ray.dist(fallSurface.surface);
          const fallPoint = ray.end(dist);

          rayPoints.push(fallPoint);

          if (isReflectableSurface(fallSurface as IReflectableSurface)) {
            const reflectableSurface = fallSurface as IReflectableSurface;
            const reflection = reflectableSurface.reflection(ray);
            ray = new Ray(fallPoint, reflection);
          } else if (isRefractableSurface(fallSurface as IRefractableSurface)) {
            const refractableSurface = fallSurface as IRefractableSurface;
            const refraction = refractableSurface.refraction(ray);
            ray = new Ray(fallPoint, refraction, !ray.isRefracted);
          } else {
            ray = null;
          }

          if (fallSurface instanceof LightSensor) {
            const sensor = fallSurface as LightSensor;
            sensor.hasLight = true;
          }
        }

        pointer.laser.update(rayPoints);
      }
    }
  }

  private fallSurface(ray: Ray): ISurface | null {
    const lt = new Vector(0, 0);
    const rt = new Vector(this.width, 0);
    const lb = new Vector(0, this.height);
    const rb = new Vector(this.width, this.height);
    const surfaces: ISurface[] = [
      new Boundary(lt, rt),
      new Boundary(rt, rb),
      new Boundary(rb, lb),
      new Boundary(lb, lt),
    ];

    for (const sceneObj of this.objects) {
      const obj = sceneObj as unknown;

      if (isSurface(obj as ISurface)) {
        const surfaceObj = obj as ISurface;

        if (!surfaceObj.surface.hasPoint(ray.source)) {
          surfaces.push(surfaceObj);
        }
      }

      if (sceneObj instanceof Obstacle) {
        const obstacleSurfaces = sceneObj.surfaces;

        for (const obsSurface of obstacleSurfaces) {
          if (!obsSurface.surface.hasPoint(ray.source)) {
            surfaces.push(obsSurface);
          }
        }
      }
    }

    let minDist = Infinity;
    let nearestSurfaceObj = null;

    for (const surfaceObj of surfaces) {
      const surface = surfaceObj.surface;
      const dist = ray.dist(surface);
      const dest = ray.end(dist);

      if (surface.hasPoint(dest) && dist > 0 && dist < minDist) {
        minDist = dist;
        nearestSurfaceObj = surfaceObj;
      }
    }

    return nearestSurfaceObj;
  }
}
