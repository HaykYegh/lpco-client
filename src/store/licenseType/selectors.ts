import type { RootState } from '../index';

export const licenseTypeByCodeSelector = (state: RootState) => state.licenseType.licenseTypeByCode;
export const licenseTypeAddDocumentsByCodeSelector = (state: RootState) =>
  state.licenseType.licenseTypeAttDocumentsByCode;
export const licenseTypeFeatureFlagsByCodeSelector = (state: RootState) =>
  state.licenseType.licenseTypeFeatureFlagsByCode;
