export function filterDataByPropNameInArray<T>(propName: string, array: string[], arr: Array<T> = []): Array<T> {
  return arr.filter((item) => array.includes((item as Record<string, unknown>)[propName] as string));
}
