import { createEntityAdapter, type EntityAdapter, type EntityId } from '@reduxjs/toolkit';

import type { ICountryItem } from './types';

export const countriesAdapter: EntityAdapter<ICountryItem> = createEntityAdapter<ICountryItem>({
  selectId: (country) => country.code as EntityId,
});
