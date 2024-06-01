import Actor from "./Actor";
import Ray from "./Ray";
import Vector from "./Vector";
import Laser from "./Laser";
import { fabric } from "fabric";
import { Canvas } from "fabric/fabric-impl";

export default class LaserPointer extends Actor {
  public readonly laser: Laser;

  constructor() {
    const scale = 0.25;
    const fabricObject = new fabric.Image("laser-pointer");

    fabricObject.scaleX = scale;
    fabricObject.scaleY = scale;

    super(fabricObject, 0);

    this.laser = new Laser("red");
  }

  get ray(): Ray {
    const source = new Vector(this.width / 2, 0)
      .rotate(this.angle)
      .add(this.pos);

    return new Ray(source, this.angle);
  }

  addToScene(canvas: Canvas): void {
    super.addToScene(canvas);
    this.laser.addToScene(canvas);
  }

  removeFromScene(canvas: Canvas): void {
    super.removeFromScene(canvas);
    this.laser.removeFromScene(canvas);
  }
}
