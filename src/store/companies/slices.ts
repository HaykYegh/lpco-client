import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { companiesAdapter } from './entityAdapters';
import { initialState } from './initialState';

import type { CompaniesState, ICompanyItem } from './types';

export const companies = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    setCompaniesData: (state: CompaniesState, { payload }: PayloadAction<ICompanyItem[]>) => {
      companiesAdapter.setAll(state.data, payload);
    },
  },
});

export const { setCompaniesData } = companies.actions;
