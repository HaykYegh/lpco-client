export function createArrayWithEntityIds(propsArr: Array<string>, data: Array<Record<string, unknown>> = []) {
  return data.reduce((acc, item) => {
    propsArr.forEach((el: string) => {
      const { [el]: rParam, ...items } = item;
      items[`${el}Arr`] = Array.isArray(rParam) ? rParam.map((curr) => curr.id as number) : [];
      acc.push(items as never);
    });

    return acc;
  }, []);
}
