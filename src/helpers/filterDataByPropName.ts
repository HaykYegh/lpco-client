export function filterDataByPropName<T>(propName: string, value: string | number, arr: Array<T> = []): Array<T> {
  return arr.filter((item) => (item as Record<string, unknown>)[propName] === value);
}
