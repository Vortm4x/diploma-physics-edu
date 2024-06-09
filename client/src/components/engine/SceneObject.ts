import { fabric } from "fabric";

export default abstract class SceneObject {
  protected fabricObject: fabric.Object;

  constructor(fabricObject: fabric.Object) {
    fabricObject.lockScalingX = true;
    fabricObject.lockScalingY = true;

    const controlsVisibility = {
      mt: false,
      mb: false,
      ml: false,
      mr: false,
      tl: false,
      tr: false,
      bl: false,
      br: false,
    };
    fabricObject.setControlsVisibility(controlsVisibility);

    this.fabricObject = fabricObject;
  }

  addToScene(canvas: fabric.Canvas): void {
    canvas.add(this.fabricObject);
  }

  removeFromScene(canvas: fabric.Canvas): void {
    canvas.remove(this.fabricObject);
  }
}
