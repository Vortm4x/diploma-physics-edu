import Ray from "./Ray";
import ISurface from "./ISurface";
import { isSurface } from "./ISurface";

export default interface IReflectableSurface extends ISurface {
  reflection(ray: Ray): number;
}

export const isReflectableSurface = (
  obj: IReflectableSurface
): obj is IReflectableSurface => {
  if (!isSurface(obj)) {
    return false;
  }

  if (obj.reflection === undefined) {
    return false;
  }

  return true;
};
