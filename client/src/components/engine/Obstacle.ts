import Actor from "./Actor";
import ISurface from "./ISurface";
import { fabric } from "fabric";

export default abstract class Obstacle extends Actor {
  abstract surfaces: ISurface[];
  readonly color: string;

  constructor(
    fabricObject: fabric.Object,
    width: number,
    height: number,
    color: string
  ) {
    fabricObject.width = width;
    fabricObject.height = height;
    fabricObject.fill = color;

    super(fabricObject, 0);

    this.color = color;
  }

  set resizeControlsEnabled(isEnabled: boolean) {
    const controlsVisibility = {
      mt: isEnabled,
      mb: isEnabled,
      ml: isEnabled,
      mr: isEnabled,
      tl: isEnabled,
      tr: isEnabled,
      bl: isEnabled,
      br: isEnabled,
    };

    this.fabricObject.lockScalingX = !isEnabled;
    this.fabricObject.lockScalingY = !isEnabled;
    this.fabricObject.setControlsVisibility(controlsVisibility);
  }
}
