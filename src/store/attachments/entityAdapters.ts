import { createEntityAdapter, type EntityAdapter, type EntityId } from '@reduxjs/toolkit';

import type { IAttachmentItem } from './types';

export const attachmentsAdapter: EntityAdapter<IAttachmentItem> = createEntityAdapter<IAttachmentItem>({
  selectId: (attachment) => attachment.code as EntityId,
});
