import { Operators } from '../../../@types/serviceTypes';

import type { StatusesList } from '../store/types';

export const licensesSearchRestrictionsGenerator = (
  statusValues: (keyof StatusesList)[],
  lpcoTypeValue: string,
  statusValue: string
) => {
  const restrictions = [];
  restrictions.push({
    field: 'status',
    values: statusValues,
    operator: Operators.NOT_IN,
  });

  if (lpcoTypeValue) {
    restrictions.push({
      field: 'licenseType',
      value: lpcoTypeValue,
      operator: Operators.EQUALS,
    });
  }

  if (statusValue) {
    restrictions.push({
      field: 'status',
      value: statusValue,
      operator: Operators.EQUALS,
    });
  }

  return restrictions;
};
