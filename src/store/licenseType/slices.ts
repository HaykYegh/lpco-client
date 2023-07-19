import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import {
  approvalsAdapter,
  documentsAdapter,
  feesAdapter,
  feesAdapterForExtend,
  transitionsAdapter,
} from './entityAdapters';
import { initialState } from './initialState';

import type {
  IAprovalsPayload,
  IAttachedDocumentItem,
  IFeatureFlagsProps,
  IFeeItem,
  ILicenseTypeByCodeProps,
  LicenseTypeStateWithDraft,
} from './types';

export const licenseType = createSlice({
  name: 'licenseType',
  initialState,
  reducers: {
    setLicenseTypeByCode: (state: LicenseTypeStateWithDraft, { payload }: PayloadAction<ILicenseTypeByCodeProps>) => {
      state.licenseTypeByCode = payload;
    },

    setAllAprovals: (state: LicenseTypeStateWithDraft, { payload }: PayloadAction<IAprovalsPayload>) => {
      approvalsAdapter.setAll(state.licenseTypeAprovalsByCode, payload.approvalsData);
      transitionsAdapter.setAll(state.licenseTypeApTransitionsByCode, payload.transitions);
    },

    setAllAttachedDocuments: (
      state: LicenseTypeStateWithDraft,
      { payload }: PayloadAction<Array<IAttachedDocumentItem>>
    ) => {
      documentsAdapter.setAll(state.licenseTypeAttDocumentsByCode, payload);
    },

    setAllLicenseFees: (state: LicenseTypeStateWithDraft, { payload }: PayloadAction<Array<IFeeItem>>) => {
      feesAdapter.setAll(state.licenseTypeFeesByCode, payload);
    },

    setAllLicenseFeesForExtend: (state: LicenseTypeStateWithDraft, { payload }: PayloadAction<Array<IFeeItem>>) => {
      feesAdapterForExtend.setAll(state.licenseTypeFeesForExtendByCode, payload);
    },

    setLicenseTypeFeatureFlags: (state: LicenseTypeStateWithDraft, { payload }: PayloadAction<IFeatureFlagsProps>) => {
      state.licenseTypeFeatureFlagsByCode = payload;
    },
  },
});

export const {
  setAllAprovals,
  setAllAttachedDocuments,
  setAllLicenseFees,
  setAllLicenseFeesForExtend,
  setLicenseTypeByCode,
  setLicenseTypeFeatureFlags,
} = licenseType.actions;
