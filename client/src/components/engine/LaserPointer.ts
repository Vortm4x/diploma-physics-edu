import Actor from "./Actor";
import Ray from "./Ray";
import Vector from "./Vector";

export default class LaserPointer extends Actor {
  constructor() {
    super("laser-pointer", 0);
  }

  get ray(): Ray {
    const source = new Vector(this.width / 2, 0)
      .rotate(this.angle)
      .add(this.pos);

    return new Ray(source, this.angle);
  }
}
