import { createEntityAdapter, type EntityAdapter, type EntityId } from '@reduxjs/toolkit';

import type { IPopupConfigsItem } from './types';

export const popupConfigsAdapter: EntityAdapter<IPopupConfigsItem> = createEntityAdapter<IPopupConfigsItem>({
  selectId: (popupConfig) => popupConfig.name as EntityId,
});
