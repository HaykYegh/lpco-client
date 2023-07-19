export function getErrorDescription(item: IErrorItem) {
  const message: string = item.message !== '' ? item.message : item.messageCode ?? '';
  const messageArgs = item.messageArguments.length ? `${item.messageArguments[0] as number}` : '';

  return `${item.field} ${messageArgs} ${message}`;
}
