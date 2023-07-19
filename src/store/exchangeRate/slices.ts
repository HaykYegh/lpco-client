import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { exchangeRateAdapter } from './exchangeRateAdapter';
import { initialState } from './initialState';

import type { ExchangeRateState, IExchangeRateItem } from './types';

export const exchangeRate = createSlice({
  name: 'exchangeRate',
  initialState,
  reducers: {
    setExchangeRateData: (state: ExchangeRateState, { payload }: PayloadAction<IExchangeRateItem[]>) => {
      exchangeRateAdapter.setAll(state.data, payload);
    },
  },
});

export const { setExchangeRateData } = exchangeRate.actions;
