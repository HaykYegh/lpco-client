import { createEntityAdapter, type EntityAdapter, type EntityId } from '@reduxjs/toolkit';

import type { ICompanyItem } from './types';

export const companiesAdapter: EntityAdapter<ICompanyItem> = createEntityAdapter<ICompanyItem>({
  selectId: (company) => company.code as EntityId,
});
