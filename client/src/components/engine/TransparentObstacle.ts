import ISurface from "./ISurface";
import Obstacle from "./Obstacle";
import RefractionBoundary from "./RefractionBoundary";
import Vector from "./Vector";

export default class TransparentObstacle extends Obstacle {
  public readonly refractionCoef: number;

  constructor(
    width: number,
    height: number,
    color: string,
    refractionCoef: number
  ) {
    super(width, height, color, 0.5);
    this.refractionCoef = refractionCoef;
  }

  get surfaces(): ISurface[] {
    const delta = new Vector(this.width / 2, this.height / 2);

    const lt = this.pos.add(new Vector(-delta.x, -delta.y).rotate(this.angle));
    const rt = this.pos.add(new Vector(delta.x, -delta.y).rotate(this.angle));
    const lb = this.pos.add(new Vector(-delta.x, delta.y).rotate(this.angle));
    const rb = this.pos.add(new Vector(delta.x, delta.y).rotate(this.angle));

    const collection = [
      new RefractionBoundary(lt, rt, this.refractionCoef),
      new RefractionBoundary(rt, rb, this.refractionCoef),
      new RefractionBoundary(rb, lb, this.refractionCoef),
      new RefractionBoundary(lb, lt, this.refractionCoef),
    ];

    return collection;
  }
}
