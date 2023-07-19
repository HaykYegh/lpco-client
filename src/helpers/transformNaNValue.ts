export const transformNaNValueToUndefined = (value: number) => (isNaN(value) ? undefined : value);
