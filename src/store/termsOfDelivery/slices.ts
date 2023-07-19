import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { termsOfDeliveryAdapter } from './termsOfDeliveryAdapter';
import { initialState } from './initialState';

import type { ITermsOfDeliveryItem, TermsOfDeliveryState } from './types';

export const termsOfDelivery = createSlice({
  name: 'termsOfDelivery',
  initialState,
  reducers: {
    setTermsOfDeliveryData: (state: TermsOfDeliveryState, { payload }: PayloadAction<ITermsOfDeliveryItem[]>) => {
      termsOfDeliveryAdapter.setAll(state.data, payload);
    },
  },
});

export const { setTermsOfDeliveryData } = termsOfDelivery.actions;
