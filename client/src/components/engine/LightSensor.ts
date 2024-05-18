import Actor from "./Actor";
import ISurface from "./ISurface";
import Segment from "./Segment";
import Vector from "./Vector";

export default class LightSensor extends Actor implements ISurface {
  constructor() {
    super("sensor", 33);
  }

  get surface(): Segment {
    const delta = new Vector(this.width / 2, 0).rotate(this.angle);

    return new Segment(this.pos.sub(delta), this.pos.add(delta));
  }
}
