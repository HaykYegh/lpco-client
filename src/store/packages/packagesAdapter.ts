import { createEntityAdapter, type EntityAdapter, type EntityId } from '@reduxjs/toolkit';

import type { IPackageItem } from './types';

export const packagesAdapter: EntityAdapter<IPackageItem> = createEntityAdapter<IPackageItem>({
  selectId: (packageItem) => packageItem.code as EntityId,
});
