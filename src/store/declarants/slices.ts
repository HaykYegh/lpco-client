import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { declarantsAdapter } from './entityAdapters';
import { initialState } from './initialState';

import type { DeclarantsState, IDeclarantItem } from './types';

export const declarants = createSlice({
  name: 'declarants',
  initialState,
  reducers: {
    setDeclarantsData: (state: DeclarantsState, { payload }: PayloadAction<IDeclarantItem[]>) => {
      declarantsAdapter.setAll(state.data, payload);
    },
  },
});

export const { setDeclarantsData } = declarants.actions;
