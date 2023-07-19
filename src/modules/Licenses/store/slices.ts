import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { initialState } from './initialState';

import type { GetLicenseTypeApiPayload, ILpcoSearchItem, LicensesState } from './types';

export const licenses = createSlice({
  name: 'licenses',
  initialState,
  reducers: {
    setNewLicensesData: (state: LicensesState, { payload }: PayloadAction<ILpcoSearchItem[]>) => {
      state.newLicensesData = payload;
    },

    setNewLicensesLoading: (state: LicensesState, { payload }: PayloadAction<boolean>) => {
      state.newLicensesLoading = payload;
    },

    setNewLicensesCount: (state: LicensesState, { payload }: PayloadAction<number>) => {
      state.newLicensesCount = payload;
    },

    setLicensesData: (state: LicensesState, { payload }: PayloadAction<ILpcoSearchItem[]>) => {
      state.licensesData = payload;
    },

    setLicensesLoading: (state: LicensesState, { payload }: PayloadAction<boolean>) => {
      state.licensesLoading = payload;
    },

    setLicensesCount: (state: LicensesState, { payload }: PayloadAction<number>) => {
      state.licensesCount = payload;
    },

    setNewLicensesSearchData: (state: LicensesState, { payload }: PayloadAction<GetLicenseTypeApiPayload[]>) => {
      state.newLicensesSearchData = payload;
    },

    setLicensesSearchData: (state: LicensesState, { payload }: PayloadAction<GetLicenseTypeApiPayload[]>) => {
      state.licensesSearchData = payload;
    },
  },
});

export const {
  setNewLicensesData,
  setNewLicensesLoading,
  setNewLicensesCount,
  setLicensesData,
  setLicensesLoading,
  setLicensesCount,
  setNewLicensesSearchData,
  setLicensesSearchData,
} = licenses.actions;
