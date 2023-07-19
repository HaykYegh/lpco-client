import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { countriesAdapter } from './entityAdapters';
import { initialState } from './initialState';

import type { CountriesState, ICountryItem } from './types';

export const countries = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    setCountriesData: (state: CountriesState, { payload }: PayloadAction<ICountryItem[]>) => {
      countriesAdapter.setAll(state.data, payload);
    },
  },
});

export const { setCountriesData } = countries.actions;
