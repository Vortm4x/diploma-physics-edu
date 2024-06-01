import Actor from "./Actor";
import ISurface from "./ISurface";
import { fabric } from "fabric";

export default abstract class Obstacle extends Actor {
  abstract surfaces: ISurface[];
  readonly color: string;

  constructor(width: number, height: number, color: string, opacity: number) {
    const fabricObject = new fabric.Rect();
    fabricObject.width = width;
    fabricObject.height = height;
    fabricObject.fill = color;
    fabricObject.opacity = opacity;

    super(fabricObject, 0);

    this.color = color;
  }
}
