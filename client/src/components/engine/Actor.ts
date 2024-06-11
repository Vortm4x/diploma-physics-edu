import { fabric } from "fabric";
import SceneObject from "./SceneObject";
import Vector from "./Vector";

export default class Actor extends SceneObject {
  constructor(fabricObject: fabric.Object, borderInset: number) {
    fabricObject.padding = -borderInset;

    if (fabricObject.scaleX !== undefined) {
      fabricObject.padding *= fabricObject.scaleX;
    }

    fabricObject.borderColor = "red";
    fabricObject.cornerColor = "green";
    fabricObject.cornerSize = 6;
    fabricObject.transparentCorners = false;
    fabricObject.originX = "center";
    fabricObject.originY = "center";

    super(fabricObject);
  }

  set deleteControl(deleteControl: fabric.Control | null) {
    this.fabricObject.controls["deleteControl"]. = undefined;
  }

  set moveXControl(moveXControl: fabric.Control) {
    this.fabricObject.controls["moveXControl"] = moveXControl;
  }

  set moveYControl(moveYControl: fabric.Control) {
    this.fabricObject.controls["moveYControl"] = moveYControl;
  }

  set rotateControl(rotateControl: fabric.Control) {
    this.fabricObject.controls["rotateControl"] = rotateControl;
  }

  resetControls(): void {
    this.fabricObject.controls = {};
  }

  get x(): number {
    if (this.fabricObject.left === undefined) {
      return NaN;
    }

    return this.fabricObject.left;
  }

  set x(x: number) {
    this.fabricObject.left = x;
  }

  get y(): number {
    if (this.fabricObject.top === undefined) {
      return NaN;
    }

    return this.fabricObject.top;
  }

  set y(y: number) {
    this.fabricObject.top = y;
  }

  get pos(): Vector {
    return new Vector(this.x, this.y);
  }

  set pos(pos: Vector) {
    this.x = pos.x;
    this.y = pos.y;
  }

  get width(): number {
    if (this.fabricObject.width == undefined) {
      return 0;
    }

    const padding =
      this.fabricObject.padding === undefined ? 0 : this.fabricObject.padding;

    const scaleX =
      this.fabricObject.scaleX === undefined ? 1 : this.fabricObject.scaleX;

    return this.fabricObject.width * scaleX + 2 * padding;
  }

  get height(): number {
    if (this.fabricObject.height == undefined) {
      return 0;
    }

    const padding =
      this.fabricObject.padding === undefined ? 0 : this.fabricObject.padding;

    const scaleY =
      this.fabricObject.scaleY === undefined ? 1 : this.fabricObject.scaleY;

    return this.fabricObject.height * scaleY + 2 * padding;
  }

  get angle(): number {
    return fabric.util.degreesToRadians(this.degrees);
  }

  get degrees(): number {
    if (this.fabricObject.angle === undefined) {
      return NaN;
    }

    return this.fabricObject.angle;
  }

  set degrees(angle: number) {
    this.fabricObject.angle = angle;
  }

  get lockMovementX(): boolean {
    if (this.fabricObject.lockMovementX === undefined) {
      return false;
    }

    return this.fabricObject.lockMovementX;
  }

  set lockMovementX(lockMovementX: boolean) {
    this.fabricObject.lockMovementX = lockMovementX;
  }

  get lockMovementY(): boolean {
    if (this.fabricObject.lockMovementY === undefined) {
      return false;
    }

    return this.fabricObject.lockMovementY;
  }

  set lockMovementY(lockMovementY: boolean) {
    this.fabricObject.lockMovementY = lockMovementY;
  }

  get lockRotation(): boolean {
    if (this.fabricObject.lockRotation === undefined) {
      return false;
    }

    return this.fabricObject.lockRotation;
  }

  set lockRotation(lockRotation: boolean) {
    const controlsVisibility = {
      mtr: !lockRotation,
    };

    this.fabricObject.setControlsVisibility(controlsVisibility);
    this.fabricObject.lockRotation = lockRotation;
  }

  isFabricObject(fabricObject: fabric.Object): boolean {
    return this.fabricObject === fabricObject;
  }
}
