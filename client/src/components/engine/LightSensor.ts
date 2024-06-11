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
  private triggered: boolean;

  constructor() {
    const scale = 0.25;
    const fabricObject = new fabric.Image("sensor-inactive");

    fabricObject.scaleX = scale;
    fabricObject.scaleY = scale;

    super(fabricObject, 33);

    this.triggered = false;
  }

  get surface(): Segment {
    const delta = new Vector(this.width / 2, 0).rotate(this.angle);

    return new Segment(this.pos.sub(delta), this.pos.add(delta));
  }

  get isTriggered(): boolean {
    return this.triggered;
  }

  set isTriggered(triggered: boolean) {
    this.triggered = triggered;

    const id = triggered ? "sensor-active" : "sensor-inactive";
    const newView = document.getElementById(id) as HTMLImageElement;

    if (newView != null) {
      const fabricImage = this.fabricObject as fabric.Image;
      fabricImage.setElement(newView);
    }
  }

  get export(): object {
    return {
      type: "LightSensor",

      x: this.x,
      y: this.y,
      degrees: this.degrees,
      lockMovementX: this.lockMovementX,
      lockMovementY: this.lockMovementY,
      lockRotation: this.lockRotation,
    };
  }

  static restore(_data: object): LightSensor {
    const obj = new LightSensor();

    return obj;
  }
}
