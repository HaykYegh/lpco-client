import { type SelectBaseOption } from '@wf/components/dist/components/FormElements/Select/Select';

export function createOptionsArrayFromData(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Array<Record<string, any>>,
  label: string,
  value: string,
  tag: string | number | null = null
): Array<SelectBaseOption> {
  return data.reduce((acc: SelectBaseOption[], item) => {
    const obj: SelectBaseOption = {
      label: item[label],
      value: item[value],
      tag: tag ? { label: item[tag] as string } : undefined,
    };
    acc.push(obj);

    return acc;
  }, []);
}
