import Boundary from "./Boundary";
import Vector from "./Vector";
import IRefractableSurface from "./IRefractableSurface";
import Ray from "./Ray";
import Segment from "./Segment";

export default class RefractionBoundary
  extends Boundary
  implements IRefractableSurface
{
  public readonly refractionCoef: number;

  constructor(begin: Vector, end: Vector, refractionCoef: number) {
    super(begin, end);
    this.refractionCoef = refractionCoef;
  }

  refraction(ray: Ray): number {
    const surface = this.surface;
    const dist = ray.dist(surface);
    const dest = ray.end(dist);

    const proj = surface.projection(ray.source);

    const vn = new Segment(proj, ray.source).vector.unit;
    const vi = new Segment(dest, ray.source).vector.unit;

    const k = ray.isRefracted ? this.refractionCoef : 1 / this.refractionCoef;

    const cosI = vi.dot(vn);
    const sinI = Math.sqrt(1 - cosI * cosI);
    const sinR = k * sinI;

    if (sinR <= 1) {
      const cosR = Math.sqrt(1 - sinR * sinR);
      const vr = vi.coef(-k).add(vn.coef(k * cosI - cosR));
      return vr.angleTo(Vector.OX) + Math.PI;
    } else {
      return vn.angleTo(new Vector(1, 0)) + vn.angleTo(vi);
    }
  }
}
