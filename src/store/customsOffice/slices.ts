import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { customsOfficeAdapter } from './customsOfficeAdapter';
import { initialState } from './initialState';

import type { CustomsOfficeState, ICustomsOfficeItem } from './types';

export const customsOffice = createSlice({
  name: 'customsOffice',
  initialState,
  reducers: {
    setCustomsOfficeData: (state: CustomsOfficeState, { payload }: PayloadAction<ICustomsOfficeItem[]>) => {
      customsOfficeAdapter.setAll(state.data, payload);
    },
  },
});

export const { setCustomsOfficeData } = customsOffice.actions;
