import { type SelectBaseOption } from '@wf/components/dist/components/FormElements/Select/Select';

export function createOptionsArrayFromStrArr(
  arr: string[],
  enumObj: Record<string, any> = {}
): Array<SelectBaseOption> {
  return arr.reduce((acc: Array<SelectBaseOption>, item: string) => {
    const obj: SelectBaseOption = { label: enumObj[item] ?? item, value: item };
    acc.push(obj);

    return acc;
  }, []);
}
