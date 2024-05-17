import Actor from "./Actor";
import IReflectableSurface from "./IReflectableSurface";
import Ray from "./Ray";
import Segment from "./Segment";
import Vector from "./Vector";

export default class Mirror extends Actor implements IReflectableSurface {
  constructor() {
    super("mirror", 35);
  }

  get surface(): Segment {
    const delta = new Vector(this.width / 2, 0).rotate(this.angle);

    return new Segment(this.pos.sub(delta), this.pos.add(delta));
  }

  reflection(ray: Ray): number {
    return 0;
  }
}
