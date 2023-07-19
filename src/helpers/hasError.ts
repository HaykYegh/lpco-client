import type { FieldErrors } from 'react-hook-form';

export function hasError(errors: FieldErrors, validation: Record<string, unknown>) {
  for (const prop in errors) {
    if (validation[prop]) {
      return true;
    }
  }

  return false;
}
