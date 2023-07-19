export function getSelectValue(
  value?: Nullable<string>,
  label?: Nullable<string>,
  tag?: TagItemType
): OptionsItemType | string {
  return value && label
    ? {
        label,
        value,
        tag,
      }
    : '';
}
