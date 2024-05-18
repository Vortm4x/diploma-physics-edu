import { fabric } from "fabric";

export default abstract class SceneObject {
  protected fabricObject: fabric.Object;

  constructor(fabricObject: fabric.Object) {
    this.fabricObject = fabricObject;
  }

  addToScene(canvas: fabric.Canvas): void {
    canvas.add(this.fabricObject);
  }
}
