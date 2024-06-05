import ISurface from "./ISurface";
import Segment from "./Segment";
import Vector from "./Vector";

export default class Boundary implements ISurface {
  public readonly surface: Segment;

  constructor(begin: Vector, end: Vector) {
    this.surface = new Segment(begin, end);
  }
}
