import type { FieldValues } from 'react-hook-form';

export function isValid(validationFields: Record<string, any>, data: FieldValues) {
  for (const prop in validationFields) {
    if (!data[prop]) {
      return false;
    }
  }

  return true;
}
