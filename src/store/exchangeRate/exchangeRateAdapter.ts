import { createEntityAdapter, type EntityAdapter, type EntityId } from '@reduxjs/toolkit';

import type { IExchangeRateItem } from './types';

export const exchangeRateAdapter: EntityAdapter<IExchangeRateItem> = createEntityAdapter<IExchangeRateItem>({
  selectId: (exchangeRate) => exchangeRate.code as EntityId,
});
