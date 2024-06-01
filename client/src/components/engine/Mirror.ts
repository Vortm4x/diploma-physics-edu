import Actor from "./Actor";
import IReflectableSurface from "./IReflectableSurface";
import IRestorable from "./IRestorable";
import Ray from "./Ray";
import Segment from "./Segment";
import Vector from "./Vector";
import { fabric } from "fabric";

export default class Mirror
  extends Actor
  implements IReflectableSurface, IRestorable
{
  constructor() {
    const scale = 0.25;
    const fabricObject = new fabric.Image("mirror");

    fabricObject.scaleX = scale;
    fabricObject.scaleY = scale;

    super(fabricObject, 35);
  }

  get surface(): Segment {
    const delta = new Vector(this.width / 2, 0).rotate(this.angle);

    return new Segment(this.pos.sub(delta), this.pos.add(delta));
  }

  reflection(ray: Ray): number {
    const surface = this.surface;
    const dist = ray.dist(surface);
    const dest = ray.end(dist);
    const fall = new Segment(dest, ray.source).vector;

    const proj = surface.projection(ray.source);
    const norm = new Segment(ray.source, proj).vector;

    return norm.angleTo(new Vector(1, 0)) + norm.angleTo(fall);
  }

  export(): object {
    return {
      type: "Mirror",

      x: this.x,
      y: this.y,
      degrees: this.degrees,
      lockMovementX: this.lockMovementX,
      lockMovementY: this.lockMovementY,
    };
  }

  static restore(_data: object): Mirror {
    const obj = new Mirror();

    return obj;
  }
}
