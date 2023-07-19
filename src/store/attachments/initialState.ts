import { attachmentsAdapter } from './entityAdapters';

import type { AttachmentsState } from './types';

export const initialState: AttachmentsState = {
  data: attachmentsAdapter.getInitialState(),
};
