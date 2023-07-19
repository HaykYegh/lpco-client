import { createEntityAdapter, type EntityAdapter, type EntityId } from '@reduxjs/toolkit';

import type { ICustomsOfficeItem } from './types';

export const customsOfficeAdapter: EntityAdapter<ICustomsOfficeItem> = createEntityAdapter<ICustomsOfficeItem>({
  selectId: (customsOffice) => customsOffice.code as EntityId,
});
