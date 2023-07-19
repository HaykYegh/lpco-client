import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { initialState } from './initialState';

import type { DocumentHistoryState, IDocumentHistoryItem } from './types';

export const documentHistory = createSlice({
  name: 'documentHistory',
  initialState,
  reducers: {
    setDocumentHistoryData: (state: DocumentHistoryState, { payload }: PayloadAction<IDocumentHistoryItem[]>) => {
      state.documentHistoryData = payload;
    },
  },
});

export const { setDocumentHistoryData } = documentHistory.actions;
