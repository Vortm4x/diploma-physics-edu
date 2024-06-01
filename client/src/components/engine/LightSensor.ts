import Actor from "./Actor";
import IRestorable from "./IRestorable";
import ISurface from "./ISurface";
import Segment from "./Segment";
import Vector from "./Vector";
import { fabric } from "fabric";

export default class LightSensor
  extends Actor
  implements ISurface, IRestorable
{
  public hasLight: boolean;

  constructor() {
    const scale = 0.25;
    const fabricObject = new fabric.Image("sensor");

    fabricObject.scaleX = scale;
    fabricObject.scaleY = scale;

    super(fabricObject, 33);

    this.hasLight = false;
  }

  get surface(): Segment {
    const delta = new Vector(this.width / 2, 0).rotate(this.angle);

    return new Segment(this.pos.sub(delta), this.pos.add(delta));
  }

  export(): object {
    return {
      type: "LightSensor",

      x: this.x,
      y: this.y,
      degrees: this.degrees,
      lockMovementX: this.lockMovementX,
      lockMovementY: this.lockMovementY,
    };
  }

  static restore(_data: object): LightSensor {
    const obj = new LightSensor();

    return obj;
  }
}
