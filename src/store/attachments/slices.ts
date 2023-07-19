import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { attachmentsAdapter } from './entityAdapters';
import { initialState } from './initialState';

import type { AttachmentsState, IAttachmentItem } from './types';

export const attachments = createSlice({
  name: 'attachments',
  initialState,
  reducers: {
    setAttachmentsData: (state: AttachmentsState, { payload }: PayloadAction<IAttachmentItem[]>) => {
      attachmentsAdapter.setAll(state.data, payload);
    },
  },
});

export const { setAttachmentsData } = attachments.actions;
