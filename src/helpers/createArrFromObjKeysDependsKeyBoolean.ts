export function createArrFromObjKeysDependsKeyBoolean(obj: Record<string, boolean>, bool: boolean): string[] {
  return Object.keys(obj).filter((item: string) => obj[item] === bool);
}
