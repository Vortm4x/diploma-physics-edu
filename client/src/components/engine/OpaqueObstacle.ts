import Boundary from "./Boundary";
import IRestorable from "./IRestorable";
import ISurface from "./ISurface";
import Obstacle from "./Obstacle";
import Vector from "./Vector";

interface IOpaqueObstacleProps {
  width: number;
  height: number;
  color: string;
}

export default class OpaqueObstacle extends Obstacle implements IRestorable {
  constructor(width: number, height: number, color: string) {
    super(width, height, color, 1);
  }

  get surfaces(): ISurface[] {
    const delta = new Vector(this.width / 2, this.height / 2);

    const lt = this.pos.add(new Vector(-delta.x, -delta.y).rotate(this.angle));
    const rt = this.pos.add(new Vector(delta.x, -delta.y).rotate(this.angle));
    const lb = this.pos.add(new Vector(-delta.x, delta.y).rotate(this.angle));
    const rb = this.pos.add(new Vector(delta.x, delta.y).rotate(this.angle));

    const collection = [
      new Boundary(lt, rt),
      new Boundary(rt, rb),
      new Boundary(rb, lb),
      new Boundary(lb, lt),
    ];

    return collection;
  }

  export(): object {
    return {
      type: "OpaqueObstacle",
      width: this.width,
      height: this.height,
      color: this.color,

      x: this.x,
      y: this.y,
      degrees: this.degrees,
      lockMovementX: this.lockMovementX,
      lockMovementY: this.lockMovementY,
    };
  }

  static restore(data: object): OpaqueObstacle {
    const objProps = data as IOpaqueObstacleProps;

    const obj = new OpaqueObstacle(
      objProps.width,
      objProps.height,
      objProps.color
    );

    return obj;
  }
}
