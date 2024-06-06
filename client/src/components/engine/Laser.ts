import { fabric } from "fabric";
import SceneObject from "./SceneObject";
import Vector from "./Vector";

export default class Laser extends SceneObject {
  private color: string;
  private points: Vector[];

  constructor(color: string) {
    super(new fabric.Path());

    this.color = color;
    this.points = [];
  }

  update(points: Vector[]): void {
    this.points = points;
    const canvas = this.fabricObject.canvas;

    if (canvas !== undefined) {
      this.removeFromScene(canvas);
      this.addToScene(canvas);
    }
  }

  addToScene(canvas: fabric.Canvas): void {
    if (this.fabricObject.canvas === undefined && this.points.length > 0) {
      this.fabricObject = this.newPath();
    }

    super.addToScene(canvas);
  }

  private newPath(): fabric.Path {
    const fabricData = {
      strokeWidth: 2,
      lockScalingX: true,
      lockScalingY: true,
      lockMovementX: true,
      lockMovementY: true,
      selectable: false,
      evented: false,
      fill: "transparent",
      stroke: this.color,
    };

    const mapCallback = (value: Vector): string => {
      return `${value.x} ${value.y}`;
    };

    const path = "M " + this.points.map<string>(mapCallback).join(" L ");
    const fabricObject = new fabric.Path(path, fabricData);

    return fabricObject;
  }
}
