import type { FieldValues } from 'react-hook-form';

import { createDataFromArrayItems } from './createDataFromArrayItems';

export function generateDataFromEntities(entityData: FieldValues[], editableFields: string[] = []) {
  return entityData.reduce((acc: FieldValues[], item: FieldValues) => {
    const obj = createDataFromArrayItems(editableFields, item);

    if (Object.keys(obj).length) {
      acc.push(obj);
    }

    return acc;
  }, []);
}
