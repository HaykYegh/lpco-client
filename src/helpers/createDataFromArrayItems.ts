import { isBackId } from './isBackId';

export function createDataFromArrayItems(items: string[] = [], existingFields: Record<string, any>) {
  const createdData = items.reduce((acc: Record<string, any>, item: string) => {
    acc[item] = existingFields[item];

    return acc;
  }, {});

  if (existingFields['id'] && isBackId(existingFields['id'] as number)) {
    createdData['id'] = existingFields['id'];
  }

  return createdData;
}
