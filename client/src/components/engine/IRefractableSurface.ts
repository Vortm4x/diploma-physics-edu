import Ray from "./Ray";
import ISurface from "./ISurface";
import { isSurface } from "./ISurface";

export default interface IRefractableSurface extends ISurface {
  refractionCoef: number;

  refraction(ray: Ray): number;
}

export const isRefractableSurface = (
  obj: IRefractableSurface
): obj is IRefractableSurface => {
  if (!isSurface(obj)) {
    return false;
  }

  if (obj.refractionCoef === undefined) {
    return false;
  }

  if (obj.refraction === undefined) {
    return false;
  }

  return true;
};
