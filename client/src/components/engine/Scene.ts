import { fabric } from "fabric";
import SceneObject from "./SceneObject";

export default class Scene {
  protected canvas: fabric.Canvas;

  constructor(sceneId: string, width: number, height: number) {
    const fabricData = {
      width: width,
      height: height,
      backgroundColor: "white",
      preserveObjectStacking: true,
    };

    this.canvas = new fabric.Canvas(sceneId, fabricData);

    // this.actors = [];
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

  addObject(object: SceneObject) {
    object.addToScene(this.canvas);

    // if(object instanceof Actor) {
    //   this.actors.push(object);
    // }
  }
}
