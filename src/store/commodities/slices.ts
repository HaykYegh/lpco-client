import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { commoditiesAdapter } from './commoditiesAdapter';
import { initialState } from './initialState';

import type { CommodityState, ICommodityItem } from './types';

export const commodities = createSlice({
  name: 'commodities',
  initialState,
  reducers: {
    setCommoditiesData: (state: CommodityState, { payload }: PayloadAction<ICommodityItem[]>) => {
      commoditiesAdapter.setAll(state.data, payload);
    },
  },
});

export const { setCommoditiesData } = commodities.actions;
