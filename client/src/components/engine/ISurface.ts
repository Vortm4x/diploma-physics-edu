import Segment from "./Segment";

export default interface ISurface {
  surface: Segment;
}

export const isSurface = (obj: ISurface): obj is ISurface => {
  if (obj.surface === undefined) {
    return false;
  }

  return true;
};
