import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { packagesAdapter } from './packagesAdapter';
import { initialState } from './initialState';

import type { IPackageItem, PackageState } from './types';

export const packages = createSlice({
  name: 'packages',
  initialState,
  reducers: {
    setPackagesData: (state: PackageState, { payload }: PayloadAction<IPackageItem[]>) => {
      packagesAdapter.setAll(state.data, payload);
    },
  },
});

export const { setPackagesData } = packages.actions;
