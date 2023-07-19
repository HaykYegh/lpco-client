import { createEntityAdapter, type EntityAdapter, type EntityId } from '@reduxjs/toolkit';

import type { IUploadItem } from './types';

export const uploadsAdapter: EntityAdapter<IUploadItem> = createEntityAdapter<IUploadItem>({
  selectId: (approval) => approval.fieldName as EntityId,
});
