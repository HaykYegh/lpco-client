import { createEntityAdapter, type EntityAdapter, type EntityId } from '@reduxjs/toolkit';

import type { ITermsOfDeliveryItem } from './types';

export const termsOfDeliveryAdapter: EntityAdapter<ITermsOfDeliveryItem> = createEntityAdapter<ITermsOfDeliveryItem>({
  selectId: (termsOfDelivery) => termsOfDelivery.code as EntityId,
});
