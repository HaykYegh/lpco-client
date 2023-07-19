import { createEntityAdapter, type EntityAdapter, type EntityId } from '@reduxjs/toolkit';

import type { ICommodityItem } from './types';

export const commoditiesAdapter: EntityAdapter<ICommodityItem> = createEntityAdapter<ICommodityItem>({
  selectId: (commodity) => commodity.code as EntityId,
});
