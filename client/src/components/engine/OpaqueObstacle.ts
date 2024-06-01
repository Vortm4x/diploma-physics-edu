import Boundary from "./Boundary";
import ISurface from "./ISurface";
import Obstacle from "./Obstacle";
import Vector from "./Vector";

export default class OpaqueObstacle extends Obstacle {
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
}
