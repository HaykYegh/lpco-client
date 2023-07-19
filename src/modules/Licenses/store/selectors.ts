import type { RootState } from '../../../store';

export const newLicensesSelector = (state: RootState) => state.licenses.newLicensesData;
export const newLicensesCountSelector = (state: RootState) => state.licenses.newLicensesCount;
export const licensesSelector = (state: RootState) => state.licenses.licensesData;
export const licensesCountSelector = (state: RootState) => state.licenses.licensesCount;
export const newLicensesSearchSelector = (state: RootState) => state.licenses.newLicensesSearchData;
export const licensesSearchSelector = (state: RootState) => state.licenses.licensesSearchData;
