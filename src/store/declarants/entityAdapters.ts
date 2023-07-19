import { createEntityAdapter, type EntityAdapter, type EntityId } from '@reduxjs/toolkit';

import type { IDeclarantItem } from './types';

export const declarantsAdapter: EntityAdapter<IDeclarantItem> = createEntityAdapter<IDeclarantItem>({
  selectId: (declarant) => declarant.code as EntityId,
});
