export default interface IRestorable {
  export(): object;
}

export const isRestorable = (obj: IRestorable): obj is IRestorable => {
  if (obj.export === undefined) {
    return false;
  }
  return true;
};
