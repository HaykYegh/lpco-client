export function createArrayFromItemsArr<T extends object>(prop: string, data: T[] = []) {
  return data.reduce((acc: T[], item: Record<string, any>) => [...acc, ...item[prop]] as T[], []);
}
