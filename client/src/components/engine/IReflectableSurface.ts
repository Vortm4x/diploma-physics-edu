import Ray from "./Ray";
import ISurface from "./ISurface";

export default interface IReflectableSurface extends ISurface {
  reflection(ray: Ray): number;
}
